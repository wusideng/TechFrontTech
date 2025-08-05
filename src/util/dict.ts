import orderStatusCodeDict from "@/lib/statusCodeDict.json";
const techStatusCodeDict = orderStatusCodeDict.tech;
export const arrTechTime = [
  "00:00:00",
  "00:30:00",
  "01:00:00",
  "01:30:00",
  "02:00:00",
  "02:30:00",
  "03:00:00",
  "03:30:00",
  "04:00:00",
  "04:30:00",
  "05:00:00",
  "05:30:00",
  "06:00:00",
  "06:30:00",
  "07:00:00",
  "07:30:00",
  "08:00:00",
  "08:30:00",
  "09:00:00",
  "09:30:00",
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
  "17:00:00",
  "17:30:00",
  "18:00:00",
  "18:30:00",
  "19:00:00",
  "19:30:00",
  "20:00:00",
  "20:30:00",
  "21:00:00",
  "21:30:00",
  "22:00:00",
  "22:30:00",
  "23:00:00",
  "23:30:00",
];

export const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24小时制
  });
  return formattedDate;
};
export const orderIsCanceled = (order) => {
  return [
    orderStatusCodeDict.client.payment_timeout.code,
    orderStatusCodeDict.client.cancel_before_pay.code,
    orderStatusCodeDict.client.refund_quest_send_to_3rd_party.code,
    orderStatusCodeDict.client.wait_for_refund.code,
    orderStatusCodeDict.client.refunded.code,
    orderStatusCodeDict.client.refund_abnormal.code,
    orderStatusCodeDict.client.refund_closed.code,
    orderStatusCodeDict.client.refund_fail.code,
    orderStatusCodeDict.client.refund_auditing.code,
  ].includes(order.payment_status_code);
};
export const orderIsWaitForPayment = (order) => {
  return [
    orderStatusCodeDict.client.wait_for_payment.code,
    orderStatusCodeDict.client.payment_failed.code,
  ].includes(order.payment_status_code);
};
export const orderIsProgressing = (order) => {
  return (
    order.payment_status_code == orderStatusCodeDict.client.paid.code &&
    (!order.order_status_code_tech ||
      [
        techStatusCodeDict.wait_for_take_order.code,
        techStatusCodeDict.confirm_take_order.code,
        techStatusCodeDict.has_on_the_way.code,
        techStatusCodeDict.has_arrived.code,
        techStatusCodeDict.start_service.code,
        techStatusCodeDict.service_end.code,
      ].includes(order.order_status_code_tech))
  );
};
// 订单列表数组过滤
export const getOrderListByStatus = (orders, status) => {
  let newOrders = [];
  switch (status) {
    case "全部订单":
      return orders;
    // case "待支付":
    //   return orders.filter((order) => orderIsWaitForPayment(order));
    case "进行中":
      return orders.filter((order) => orderIsProgressing(order));
    case "已完成":
      return orders.filter(
        (order) =>
          order.payment_status_code == orderStatusCodeDict.client.paid.code &&
          [techStatusCodeDict.has_left.code].includes(
            order.order_status_code_tech
          )
      );
    case "已取消":
      return orders.filter((order) => orderIsCanceled(order));
  }
  return newOrders;
};

// 根据订单信息获取列表状态
// # code	content	comment	dict_type
// # order_011	待支付	已预约待支付	order
// # order_012	已支付	已预约已支付	order
// # order_013	待退款	已申请退款，待退款审批通过	order
// # order_014	已退款	已退款，已通过	order
// # order_021	待接单	1、等待技师接单；2、等待管理员排单；3、技师拒绝接单，等待管理员排单	order
// # order_022	确认接单	技师确认接单	order
// # order_023	已经出发	技师已出发	order
// # order_024	已经到达	技师已到达	order
// # order_025	开始服务	技师开始服务	order
// # order_026	顾客确认服务结束	（顾客）服务结束	order
// # order_027	技师确认服务结束	（技师）服务结束	order
// # order_028	确认离开	确认离开	order
// # order_031	顾客评论	顾客评论	order
// # order_032	技师评论	技师评论	order
