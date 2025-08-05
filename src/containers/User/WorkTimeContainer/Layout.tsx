import { useEffect, useState } from "react";
import Page from "./Page";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTechUserWorkTime } from "@/store/slices/worktimeSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";

const Layout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const init = async () => {
      await dispatch(getTechUserWorkTime(user.openid));
      setLoading(false);
    };
    init();
  });
  if (loading) {
    return (
      <MiddleContentHeader
        title={`工作时间`}
        loading={true}
        withFooter={false}
        className={styles.wrapper}
      >
        <></>
      </MiddleContentHeader>
    );
  }
  return <Page />;
};
export default Layout;
