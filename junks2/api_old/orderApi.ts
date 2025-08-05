// import apiClient from "./apiClient";

// export const createOrderApi = (order) => {
//   return apiClient.post("/orders/create/", order);
// };

// // 获取订单列表
// export const fetchOrders = (user_id) => {
//   return apiClient.get(`/orders/techOrderList/${user_id}`);
// };
// export const fetchTodoOrderCount = (user_id) => {
//   return apiClient.get(`/orders/techOrderList/toDoOrdersCount/${user_id}`);
// };
// // 获取订单详细
// export const fetchOrderDetail = (order_id) => {
//   return apiClient.get(`/orders/clientOrderList/${order_id}`);
// };

// // 更新订单状态
// export const updateOrderStatusApi = (orderStatus) => {
//   return apiClient.post(`/ordersStatus/`, orderStatus);
// };

// // 更新订单状态，并添加照片报备
// export const updateOrderStatusExportApi = (formData, orderStatus) => {
//   let order_id = orderStatus.order_id;
//   let order_status_type_code = orderStatus.order_status_type_code;
//   let order_status_type = orderStatus.order_status_type;
//   let order_operator = orderStatus.order_operator;
//   return apiClient.post(
//     `/ordersStatus/update_from_tech?order_id=${order_id}&order_operator=${order_operator}&order_status_type_code=${order_status_type_code}&order_status_type=${order_status_type}`,
//     formData
//   );
// };

// // 获取订单状态
// export const fetchOrderStatusApi = (order_id) => {
//   return apiClient.get(`ordersStatus/orderstatus/${order_id}`);
// };
