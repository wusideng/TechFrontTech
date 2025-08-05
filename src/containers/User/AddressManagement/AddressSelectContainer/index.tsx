import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Empty, List, Picker, Toast } from "antd-mobile";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { POIformatted } from "@/types/AddressManagement";
import useGaodeAddress from "@/hooks/address/useGaodeAddress";
import AddressPoiList from "./addressPoiList";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addTechAddress,
  getTechAddresses,
  selectPoi,
  updateTechAddress,
} from "@/store/slices/addressSlice";
import CustomSearchBar from "./CustomSearchBar";
import styles from "./style.module.less";
import { getOpenCitiesApi } from "@/api/addressApi";
import { DownOutline, LocationFill } from "antd-mobile-icons";
import { getFullAddress } from "@/util/utils";

const AddressSelectContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams<{ addressId?: string }>();
  const addressId = params.addressId;
  const isNewAddress =
    addressId !== null && addressId !== "" && addressId !== undefined
      ? false
      : true;
  const {
    fetchNearbyLocations,
    pois,
    isSearchingPois,
    amapInitialized,
    fetchNearbyLocationsBykeyword,
    clearPois,
  }: {
    fetchNearbyLocations: (
      keyword?: string,
      lon?: number,
      lat?: number
    ) => void;
    fetchNearbyLocationsBykeyword: (keyword: string, city: string) => void;
    clearPois: () => void;
    amapInitialized: boolean;
    pois: POIformatted[];
    isSearchingPois: boolean;
  } = useGaodeAddress();
  const [searchValue, setSearchValue] = useState("");
  // 从 Redux 获取位置信息
  const {
    address,
    loadingTechAddresses,
    defaultTechAddress,
    techEditedAddress,
  } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState(null);
  const [cityOptions, setCityOptions] = useState<any>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    if (address?.city) {
      setCity(address.city);
    }
  }, [address]);
  useEffect(() => {
    const init = async () => {
      try {
        setLoadingCities(true);
        const citys = await getOpenCitiesApi();
        const cityOptions = citys.map((city) => {
          return { label: city, value: city };
        });
        dispatch(getTechAddresses(user.openid));
        setLoadingCities(false);
        setCityOptions(cityOptions);
      } catch (error) {
      } finally {
        setLoadingCities(false);
      }
    };
    init();
  }, []);
  const handleSelectLocation = async (location: POIformatted) => {
    // 将选中的地址 dispatch 到 reducer
    // dispatch(selectPoi(location));
    if (isNewAddress) {
      console.log("isnew");
      await dispatch(
        addTechAddress({
          ...location,
          openid: user.openid,
          address: getFullAddress(location),
          is_default: false,
        })
      );
      Toast.show({
        icon: "success",
        content: "接单地址添加成功",
      });
    } else {
      console.log("update");
      await dispatch(
        updateTechAddress({
          addressId: parseInt(addressId),
          address: {
            ...location,
            openid: user.openid,
            address: getFullAddress(location),
            is_default: techEditedAddress.is_default,
          },
        })
      );
      Toast.show({
        icon: "success",
        content: "接单地址更新成功",
      });
    }

    // 返回上一页
    navigate(-1);
  };

  // 直接处理搜索，不需要额外的debounce（CustomSearchBar内部已有）
  const handleSearch = async (value: any) => {
    setSearchValue(value);

    if (!address?.lat || !address?.lon) {
      Toast.show({
        icon: "fail",
        content: "位置信息不可用, 请打开定位",
      });
      return;
    }

    if (value) {
      fetchNearbyLocationsBykeyword(value, city);
    } else {
      fetchNearbyLocations();
    }
  };

  const handleCancel = () => {
    setSearchValue("");
    if (address?.lat && address?.lon) {
      fetchNearbyLocations();
    }
  };
  useEffect(() => {
    if (
      address?.lat &&
      address?.lon &&
      amapInitialized &&
      address?.city == city
    ) {
      fetchNearbyLocations();
    }
  }, [address, amapInitialized, city]);
  const loading = loadingCities || loadingTechAddresses;

  return (
    <MiddleContentHeader
      title="设置接单位置"
      className={styles.address_select_container}
      withFooter={false}
      loading={loading}
    >
      <div
        className={styles.city_wrapper}
        onClick={() => {
          if (!loading && address?.city) {
            setVisible(true);
          }
        }}
      >
        <div className={styles.city}>
          <DownOutline />
          <div>
            {city ? (
              <div className={styles.city_inner}>
                <span>{city}</span>
                <span className={styles.hint}>（点击切换城市）</span>
              </div>
            ) : (
              "加载定位中"
            )}
          </div>
        </div>

        <Picker
          columns={[cityOptions]}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          value={address?.city ? [address.city] : []}
          onConfirm={(v) => {
            if (v !== city) {
              clearPois();
            }
            setCity(v[0]);
          }}
        />
      </div>
      <div className="search-bar-container">
        <CustomSearchBar
          placeholder="搜索地点"
          defaultValue={searchValue}
          onSearch={handleSearch}
          onCancel={handleCancel}
          debounceTime={500}
          showCancelButton={(focus: any, value: any) =>
            value && value.length > 0
          }
        />
      </div>
      <List
        header={
          <div className={styles.current_location_header}>
            <div className={styles.current_location_header_title}>
              当前接单位置
            </div>
          </div>
        }
      >
        {address?.region ? (
          <List.Item
            title={
              <div className={styles.list_title}>
                <LocationFill
                  fontSize={20}
                  color="var(--adm-color-secondary)"
                />
                <span>{defaultTechAddress.region}</span>
              </div>
            }
            arrowIcon={false}
            description={address.street}
          />
        ) : (
          <Empty description="暂无当前接单位置" />
        )}
      </List>
      <AddressPoiList
        pois={pois}
        searchValue={searchValue}
        isSearchingPois={isSearchingPois}
        handleSelectLocation={handleSelectLocation}
      />
    </MiddleContentHeader>
  );
};

export default AddressSelectContainer;
