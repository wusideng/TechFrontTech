import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import Page from "./Page";
import { useEffect, useState } from "react";
import styles from "./style.module.less";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTechAddresses } from "@/store/slices/addressSlice";
import { Toast } from "antd-mobile";

const Layout = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAddressList();
  }, []);

  const fetchAddressList = async () => {
    setLoading(true);
    try {
      await dispatch(getTechAddresses(user.openid)).unwrap();
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "获取地址列表失败",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAddressList();
  }, [dispatch]);
  if (loading) {
    return (
      <MiddleContentHeader
        title="管理接单位置"
        className={styles.address_management_container}
        loading={loading}
        withFooter={false}
      >
        <div></div>
      </MiddleContentHeader>
    );
  }
  return <Page fetchAddressList={fetchAddressList} />;
};
export default Layout;
