import { Tabs } from "antd-mobile";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import styles from "./style.module.less";
import OrderList from "./OrderList";

const tabItems = [
  { key: "1", title: "全部订单" },
  // { key: "2", title: "待支付" },
  { key: "2", title: "进行中" },
  { key: "3", title: "已完成" },
  { key: "4", title: "已取消" },
];
const OrderContainer = () => {
  return (
    <MiddleContentTab className={styles.order_container_wrapper}>
      <Tabs defaultActiveKey="1">
        {tabItems.map((item) => {
          return (
            <Tabs.Tab title={`${item.title}`} key={item.key}>
              <div className={styles.order_list_wrapper}>
                <OrderList tabTitle={item.title} />
              </div>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </MiddleContentTab>
  );
};

export default OrderContainer;
