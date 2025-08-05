import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import Page from "./Page";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { getOrder, getOrderStatus } from "@/store/slices/orderSlice";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      await dispatch(getOrder(id));
      await dispatch(getOrderStatus(parseInt(id)));
      setLoading(false);
    };
    init();
  }, []);
  if (loading) {
    return (
      <MiddleContentHeader title="订单详情" withFooter={false} loading={true}>
        <></>
      </MiddleContentHeader>
    );
  }
  return <Page />;
};
export default Layout;
