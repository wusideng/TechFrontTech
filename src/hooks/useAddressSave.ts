import {
  addTechAddress,
  getTechAddresses,
  getTechDefaultAddress,
} from "@/store/slices/addressSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import useGaodeAddress from "./address/useGaodeAddress";
import { getFullAddress } from "@/util/utils";

const useAddressSave = () => {
  const dispatch = useAppDispatch();
  useGaodeAddress();
  const { user } = useAppSelector((state) => state.user);
  const { address, defaultTechAddress } = useAppSelector(
    (state) => state.address
  );
  useEffect(() => {
    if (user?.openid) {
      dispatch(getTechDefaultAddress(user.openid));
    }
  }, [user]);

  useEffect(() => {
    const init = async () => {
      if (
        address &&
        address.lon &&
        address.lat &&
        user?.openid &&
        defaultTechAddress === null
      ) {
        dispatch(
          addTechAddress({
            openid: user.openid,
            province: address.province,
            city: address.city,
            district: address.district,
            region: address.region,
            street: address.street,
            address: getFullAddress(address),
            lon: address.lon,
            lat: address.lat,
            is_default: true,
          })
        );
        dispatch(getTechDefaultAddress(user.openid));
      }
    };
    init();
  }, [address, defaultTechAddress, user]);
};
export default useAddressSave;
