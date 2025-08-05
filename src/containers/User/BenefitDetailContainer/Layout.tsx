import { useEffect, useState } from "react";
import Page from "./Page";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  clearBenefitDetails,
  getBenefitDetails,
} from "@/store/slices/billSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";

const Layout = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    const init = async () => {
      await dispatch(getBenefitDetails(user.openid));
      setLoading(false);
    };
    init();
    return () => {
      dispatch(clearBenefitDetails());
    };
  }, []);
  if (loading) {
    return (
      <MiddleContentHeader
        title="收益详情"
        withFooter={false}
        loading={true}
        className={styles.wrapper}
      >
        <></>
      </MiddleContentHeader>
    );
  }
  return <Page />;
};
export default Layout;
