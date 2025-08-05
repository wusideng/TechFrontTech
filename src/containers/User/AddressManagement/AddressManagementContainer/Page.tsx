import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast, Button, Card, Modal, Empty } from "antd-mobile";
import {
  CheckCircleFill,
  DeleteOutline,
  EditSOutline,
  PhoneFill,
} from "antd-mobile-icons";
import { baseUrl } from "@/util/config";
import {
  getTechAddresses,
  deleteTechAddress,
  updateTechAddress,
  setEditedAddress,
} from "@/store/slices/addressSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { useAppDispatch, useAppSelector } from "@/store";
import { Address } from "@/types/Address";

const Page = ({ fetchAddressList }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { techAddresses: addresses } = useAppSelector((state) => state.address);
  // const previousPathname = location.state?.previousPathname;
  const [loading, setLoading] = useState(false);
  const handleEditAddress = (addressId: number, address: Address) => {
    dispatch(setEditedAddress(address));
    navigate(`/${baseUrl}/user/address/edit/${addressId}`);
  };
  const setDefaultAddress = async (addressId: number, address: Address) => {
    const new_address = { ...address, is_default: true };
    setLoading(true);
    try {
      await dispatch(updateTechAddress({ addressId, address: new_address }));
      await fetchAddressList();
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "设置当前接单地址失败",
      });
    }
    setLoading(false);
  };

  const handleDeleteAddress = (addressId: any) => {
    Modal.confirm({
      content: "确定要删除这个接单地址吗？",
      onConfirm: async () => {
        try {
          await dispatch(deleteTechAddress(addressId));
          Toast.show({
            icon: "success",
            content: "接单地址删除成功",
          });
          fetchAddressList();
        } catch (error) {
          Toast.show({
            icon: "fail",
            content: "接单地址删除失败",
          });
        }
      },
    });
  };
  return (
    <MiddleContentHeader
      title="管理接单位置"
      className={styles.address_management_container}
      loading={loading}
      withFooter={false}
      CustomFooter={<CustomFooter />}
    >
      <div className={styles.address_list}>
        {(!addresses || addresses.length == 0) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Empty description="暂无接单地址" />
          </div>
        )}
        {addresses.map((address: Address, index) => (
          <Card key={index} className={styles.address_item}>
            <div className={styles.address_item_content_wrapper}>
              <div className={styles.user_info_wrapper}>
                <div className={styles.address}>
                  {address.region} {address.detail_address}
                </div>
                <div className={styles.street}>
                  {address.province +
                    " " +
                    address.city +
                    " " +
                    address.district}
                </div>
                <div className={styles.street}>{address.street}</div>
              </div>

              <div className={styles.bottom_line_wrapper}>
                {address.is_default ? (
                  <div className={styles.default_tag}>
                    <CheckCircleFill className={styles.icon} />
                    已设为当前接单位置
                  </div>
                ) : (
                  <div
                    className={styles.default_tag_disabled}
                    onClick={(event: any) => {
                      if (!address.is_default) {
                        event.stopPropagation();
                      }
                      setDefaultAddress(address.id, address);
                    }}
                  >
                    <span className={styles.circle}></span>
                    <span>设为接单位置</span>
                  </div>
                )}
                <div className={styles.actions}>
                  <div className={styles.action}>
                    <EditSOutline
                      color="#6f6f6f"
                      fontSize={18}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEditAddress(address.id, address);
                      }}
                    />
                  </div>
                  <div className={styles.action}>
                    <DeleteOutline
                      color="#6f6f6f"
                      fontSize={18}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteAddress(address.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MiddleContentHeader>
  );
};

export default Page;
const CustomFooter = () => {
  const navigate = useNavigate();
  const handleAddAddress = () => {
    navigate(`/${baseUrl}/user/address/add`, {
      state: { previousPathname: "addressmanagement" },
    });
  };
  return (
    <div className={styles.bottom_button_fixed_wrapper}>
      <div className={styles.bottom_button_fixed}>
        <Button
          block
          color="primary"
          className="single-button"
          onClick={handleAddAddress}
        >
          添加地址
        </Button>
      </div>
    </div>
  );
};
