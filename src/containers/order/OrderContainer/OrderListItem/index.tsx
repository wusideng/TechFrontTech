import { useEffect } from "react";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import { orderIsCanceled, orderIsWaitForPayment } from "@/util/dict";
import { useAppDispatch } from "@/store";
import styles from "./style.module.less";
import { Card } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/util/config";
import moment from "moment";

const techStatusCodeDict = orderStatusCodeDict.tech;
const getOrderStatus = (order) => {
  if (orderIsWaitForPayment(order)) {
    return "待支付";
  }
  if (orderIsCanceled(order)) {
    return "已取消";
  }
  const techStatus = order.order_status_code_tech;
  switch (techStatus) {
    case techStatusCodeDict.has_left.code:
      return "已完成";
    default:
      return "进行中";
  }
};
const OrderListItem = ({ order }) => {
  const navigate = useNavigate();
  const turnToDetail = (order_id) => {
    navigate(`/${baseUrl}/order/${order_id}`);
  };
  return (
    <Card className={styles.order_item_card}>
      <div
        className={styles.order_item}
        onClick={() => turnToDetail(order.order_id)}
      >
        <div className={styles.content_title}>
          <span>
            {order.nickname}
            <span className={styles.user_danger}>
              危险等级｜{order.client?.user_grade}
            </span>
          </span>
          <span>{getOrderStatus(order)}</span>
        </div>
        <div className={styles.content_item}>
          <span>服务项目</span>｜
          <span>{order.order_products[0]?.product_name}</span>
        </div>
        <div className={styles.content_item}>
          <span>服务费用</span>｜<span>{order.order_cost}（元）</span>
        </div>
        <div className={styles.content_item}>
          <span>服务时间</span>｜
          <span>{moment(order.service_time).format("YYYY-MM-DD HH:mm")}</span>
        </div>
        <div className={styles.content_item}>
          <span>{order.service_address}</span>
        </div>
      </div>
    </Card>
  );
};

export default OrderListItem;
