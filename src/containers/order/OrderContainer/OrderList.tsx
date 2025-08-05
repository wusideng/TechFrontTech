import { getOrdersApi } from "@/api/orderApi";
import InfiniteScrollLoader from "@/components/InfiniteScrollForTabs";
import { useAppDispatch, useAppSelector } from "@/store";
import { setOrders } from "@/store/slices/orderSlice";
import { getOrderListByStatus } from "@/util/dict";
import OrderListItem from "./OrderListItem";
import { baseUrl } from "@/util/config";
import { useNavigate } from "react-router-dom";

const OrderList = ({ tabTitle }: { tabTitle: string }) => {
  const { orders, totalCount, pageNumber } = useAppSelector(
    (state) => state.order
  );
  const { user } = useAppSelector((state) => state.user);
  const filterOrders = getOrderListByStatus(orders, tabTitle);
  const dispatch = useAppDispatch();
  const loadMoreData = async (
    pageNumber: number,
    pageSize: number,
    signal: AbortSignal
  ) => {
    if (user.openid) {
      const res = await getOrdersApi({
        user_openid: user.openid,
        pageNumber,
        pageSize,
        signal,
      });
      return res;
    }
    return { data: [], totalCount: 0, currentPage: 1, pageSize: 10 };
  };

  return (
    <InfiniteScrollLoader
      data={orders}
      loadMoreApi={loadMoreData}
      totalCount={totalCount}
      pageNumber={pageNumber}
      setDataAction={(data) => {
        dispatch(setOrders(data));
      }}
      emptyDescription={"暂无订单"}
      customIsEmpty={totalCount === orders.length && filterOrders.length === 0}
    >
      {filterOrders.map((order: any, index: any) => (
        <OrderListItem order={order} key={index} />
      ))}
    </InfiniteScrollLoader>
  );
};
export default OrderList;
