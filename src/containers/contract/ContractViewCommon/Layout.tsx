import { useEffect, useLayoutEffect, useState } from "react";
import Page from "./Page";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  clearContractStatus,
  fetchContractStatus,
} from "@/store/slices/contractSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { useParams } from "react-router-dom";
import { contractTypeDict } from "@/util/utils";

const Layout = () => {
  const { contract_type } = useParams();
  const contract_type_text = contractTypeDict[contract_type];
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  useLayoutEffect(() => {
    dispatch(clearContractStatus());
  }, []);
  useEffect(() => {
    const init = async () => {
      await dispatch(
        fetchContractStatus({
          openid: user.openid,
          contract_type: contract_type_text,
        })
      );
      setLoading(false);
    };
    init();
  }, []);
  if (loading) {
    return (
      <MiddleContentHeader
        title={"技师合约签订"}
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
