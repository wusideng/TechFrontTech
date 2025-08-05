import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { useAppSelector } from "@/store";
import { Card, Empty, Picker } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import { Link } from "react-router-dom";
import { baseUrl } from "@/util/config";
import { useEffect, useState } from "react";
import moment from "moment";
const pickerOptions = [
  { label: "全部", value: "all" },
  { label: "近一周", value: "week" },
  { label: "近一月", value: "month" },
];
const Page = () => {
  const { details } = useAppSelector((state) => state.bill);
  const [visible, setVisible] = useState(false);
  const [filterValue, setFilterValue] = useState("all");
  const [filteredDetails, setFilteredDetails] = useState([]);
  useEffect(() => {
    switch (filterValue) {
      case "all":
        setFilteredDetails(details);
        break;
      case "week":
        const sevenDaysAgo = moment().subtract(7, "days");
        const filteredDetails_oneweek = details.filter(
          ([order, _bill, _product]) => {
            const orderDate = moment(order.create_order_time);
            return orderDate.isAfter(sevenDaysAgo);
          }
        );
        setFilteredDetails(filteredDetails_oneweek);
        break;
      case "month":
        const oneMonthAgo = moment().subtract(1, "month");
        const filteredDetails_onemonth = details.filter(
          ([order, _bill, _product]) => {
            const orderDate = moment(order.create_order_time);

            return orderDate.isSameOrAfter(oneMonthAgo);
          }
        );
        setFilteredDetails(filteredDetails_onemonth);
    }
  }, [filterValue]);
  const renderEmpty = () => {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40%",
        }}
      >
        <Empty description="暂无数据" />
      </div>
    );
  };
  const renderContent = () => {
    return (
      <div className={styles.detail_wrapper}>
        {filteredDetails.map(([order, bill, order_products]) => {
          return (
            <Card>
              <div className={styles.card_content_wrapper}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className={styles.item}>
                    <span className={styles.title}>技师收益</span>
                    <span className={styles.money}>￥{bill.tech_income}</span>
                  </div>
                  <Link to={`/${baseUrl}/order/${order.order_id}`}>
                    查看订单详情
                  </Link>
                </div>

                <div className={styles.item}>
                  <span className={styles.title}>订单总金额</span>
                  <span className={styles.money2}>￥{bill.amount}</span>
                </div>
                <div>项目列表：</div>
                <div className={styles.product_wrapper_outer}>
                  {order_products.map((product) => {
                    return (
                      <div className={styles.product_wrapper}>
                        <div className={styles.product_line}>
                          <div style={{ display: "flex", gap: 5 }}>
                            <span style={{ fontWeight: "bold" }}>
                              {product.product_name}
                            </span>
                            <span>￥{product.price_current}</span>
                          </div>
                          <span>数量：{product.product_count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };
  const renderFilter = () => {
    return (
      <div className={styles.filter_wrapper} onClick={() => setVisible(true)}>
        <DownOutline />
        <span>筛选</span>
      </div>
    );
  };
  return (
    <MiddleContentHeader
      title="收益详情"
      withFooter={false}
      className={styles.wrapper}
    >
      {filteredDetails.length == 0 && renderEmpty()}
      {filteredDetails.length > 0 && renderFilter()}
      {filteredDetails.length > 0 && renderContent()}

      <Picker
        columns={[pickerOptions]}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={[filterValue]}
        onConfirm={(v) => {
          setFilterValue(v[0] as string);
        }}
      />
    </MiddleContentHeader>
  );
};
export default Page;
