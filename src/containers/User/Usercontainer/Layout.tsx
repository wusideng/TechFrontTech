import { useAppDispatch, useAppSelector } from "@/store";
import Page from "./Page";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import styles from "./style.module.less";
import { useEffect, useState } from "react";
import {
  clearApplyStatus,
  getApplyingStatus,
} from "@/store/slices/applyStatusSlice";
import { getBillByTechSum } from "@/store/slices/billSlice";

const Layout = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      await dispatch(getBillByTechSum(user.openid));
      // 申请状态查看，暂时没有用到，暂时注释掉
      // await dispatch(getApplyingStatus(user.openid));
      setLoading(false);
    };
    if (user) {
      init();
    }
  }, [user]);
  useEffect(() => {
    return () => {
      dispatch(clearApplyStatus());
    };
  }, []);

  if (!user || loading) {
    return (
      <MiddleContentTab
        className={styles.user_container_wrapper}
        loading={true}
      >
        <></>
      </MiddleContentTab>
    );
  }
  return <Page />;
};

export default Layout;
