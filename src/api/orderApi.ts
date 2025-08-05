import { OrderStatus } from "@/types/Order";
import apiClient from "./apiClient";

// 获取订单列表
// export const getOrdersApi = async (user_id): Promise<any[]> => {
//   return await apiClient.get(`/orders/techOrderList/${user_id}`);
// };
// 获取订单列表
export const getOrdersApi = ({ user_openid, pageNumber, pageSize, signal }) => {
  return apiClient.get(
    `/orders/techOrderList/${user_openid}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      signal,
    }
  );
  // return
  // return apiClient.get('/orders/clientOrderList/?pageNum=0&pageSize=10');
};
export const getTodoOrderCountApi = async (user_id): Promise<number> => {
  return await apiClient.get(
    `/orders/techOrderList/toDoOrdersCount/${user_id}`
  );
};
// 获取订单详细
export const getOrderDetailApi = async (order_id): Promise<any> => {
  return await apiClient.get(`/orders/tech_order_detail/${order_id}`);
};

// 更新订单状态
export const updateOrderStatusApi = async (orderStatus: OrderStatus) => {
  return await apiClient.post(`/ordersStatus/`, orderStatus);
};

// 更新订单状态，并添加照片报备
export const updateOrderStatusExportApi = async (
  formData: FormData,
  orderStatus: OrderStatus
) => {
  let order_id = orderStatus.order_id;
  let order_status_type_code = orderStatus.order_status_type_code;
  let order_status_type = orderStatus.order_status_type;
  let order_operator = orderStatus.order_operator;
  return await apiClient.post(
    `/ordersStatus/update_from_tech?order_id=${order_id}&order_operator=${order_operator}&order_status_type_code=${order_status_type_code}&order_status_type=${order_status_type}`,
    formData
  );
};

// 获取订单状态
export const fetchOrderStatusApi = async (order_id: number) => {
  return await apiClient.get(`ordersStatus/orderstatus/${order_id}`);
};
