import { useEffect, useState } from "react";
import Page from "./Page";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./style.module.less";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import { getTechInitialValues } from "@/store/slices/userSlice";

const Layout = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      if (user) {
        // await dispatch(getTechDefaultAddress(user.openid));
        await dispatch(
          getTechInitialValues({ openid: user.openid, user_id: user.user_id })
        );
        setLoading(false);
      }
    };
    init();
  }, [user]);
  if (loading) {
    return (
      <MiddleContentTab className={styles.wrapper} loading={true}>
        <></>
      </MiddleContentTab>
    );
  }
  return <Page />;
};
export default Layout;
