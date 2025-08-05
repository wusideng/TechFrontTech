// import {
//   createOrderApi,
//   fetchOrders,
//   fetchOrderDetail,
//   updateOrderStatusApi,
//   fetchOrderStatusApi,
//   updateOrderStatusExportApi,
//   fetchTodoOrderCount,
// } from "@/api/orderApi";
// import { orderIsProgressing } from "@/util/dict";
// export const TODO_ORDER = "TODO_ORDER";

// export const LOAD_CREATEORDER_REQUEST = "LOAD_CREATEORDER_REQUEST";
// export const LOAD_CREATEORDER_SUCCESS = "LOAD_CREATEORDER_SUCCESS";
// export const LOAD_CREATEORDER_FAILURE = "LOAD_CREATEORDER_FAILURE";
// export const LOAD_ORDERS_REQUEST = "LOAD_ORDERS_REQUEST";
// export const LOAD_ORDERS_SUCCESS = "LOAD_ORDERS_SUCCESS";
// export const LOAD_ORDERS_FAILURE = "LOAD_ORDERS_FAILURE";
// export const LOAD_ORDER_REQUEST = "LOAD_ORDER_REQUEST";
// export const LOAD_ORDER_SUCCESS = "LOAD_ORDER_SUCCESS";
// export const LOAD_ORDER_FAILURE = "LOAD_ORDER_FAILURE";
// export const LOAD_UPDATEORDER_REQUEST = "LOAD_UPDATEORDER_REQUEST";
// export const LOAD_UPDATEORDER_SUCCESS = "LOAD_UPDATEORDER_SUCCESS";
// export const LOAD_UPDATEORDER_FAILURE = "LOAD_UPDATEORDER_FAILURE";
// export const LOAD_FETCHORDERSTATUS_REQUEST = "LOAD_FETCHORDERSTATUS_REQUEST";
// export const LOAD_FETCHORDERSTATUS_SUCCESS = "LOAD_FETCHORDERSTATUS_SUCCESS";
// export const LOAD_FETCHORDERSTATUS_FAILURE = "LOAD_FETCHORDERSTATUS_FAILURE";

// export const getOrders = (user_id) => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_ORDERS_REQUEST });
//     try {
//       const orders: any = await fetchOrders(user_id);
//       dispatch({ type: LOAD_ORDERS_SUCCESS, payload: orders });
//       const todoCount = orders.filter((order) =>
//         orderIsProgressing(order)
//       ).length;
//       dispatch({ type: TODO_ORDER, payload: todoCount });
//     } catch (error) {
//       dispatch({ type: LOAD_ORDERS_FAILURE, payload: error.message });
//     }
//   };
// };
// export const getTodoOrderCount = (user_id) => {
//   return async (dispatch) => {
//     try {
//       const todoCount = await fetchTodoOrderCount(user_id);
//       dispatch({ type: TODO_ORDER, payload: todoCount });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
// export const getOrder = (order_id) => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_ORDER_REQUEST });
//     try {
//       const orders = await fetchOrderDetail(order_id);
//       dispatch({ type: LOAD_ORDER_SUCCESS, payload: orders });
//     } catch (error) {
//       dispatch({ type: LOAD_ORDER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 更新订单状态
// // orderStatus = {
// //     "order_id": 0,
// //     "order_status_type_code": "string",
// //     "order_status_type": "string"
// // }
// export const updateOrderStatus = (orderStatus) => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_UPDATEORDER_REQUEST });
//     try {
//       const res = await updateOrderStatusApi(orderStatus);
//       dispatch({ type: LOAD_UPDATEORDER_SUCCESS, payload: res });
//     } catch (error) {
//       dispatch({ type: LOAD_UPDATEORDER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 上传订单状态，上传照片
// export const updateOrderStatusExport = (formStatus, orderStatus) => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_UPDATEORDER_REQUEST });
//     try {
//       const res = await updateOrderStatusExportApi(formStatus, orderStatus);
//       dispatch({ type: LOAD_UPDATEORDER_SUCCESS, payload: res });
//     } catch (error) {
//       dispatch({ type: LOAD_UPDATEORDER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 读取订单状态
// export const fetchOrderStatus = (order_id) => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_FETCHORDERSTATUS_REQUEST });
//     try {
//       const res = await fetchOrderStatusApi(order_id);
//       dispatch({ type: LOAD_FETCHORDERSTATUS_SUCCESS, payload: res });
//     } catch (error) {
//       dispatch({ type: LOAD_FETCHORDERSTATUS_FAILURE, payload: error.message });
//     }
//   };
// };
