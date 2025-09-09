import moment from "moment";
import { Card, Divider } from "antd-mobile";

import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import OrderDetailClientCard from "@/components/order/OrderDetailClientCard";
import OrderDetailSteps from "./OrderDetailSteps";
import "./style.less";
import { orderIsWaitForPayment, orderIsCanceled } from "@/util/dict";
import { useAppSelector } from "@/store";
import styles from "./style.module.less";


const Page = () => {
  // 渠道费（平台维护费）（营业税）
  const maintainence_fee = 10
  const { order, orderStatus, loading } = useAppSelector(
    (state) => state.order
  ); // 确保路径正确
  const totalFee = () => {
    let total = 0;
    order.order_products.forEach((product) => {
      total += product.price_current * product.product_count;
    });
    total += order.travel_cost * 2;
    total = total - (order.coupon_value || 0);
    return total;
  };
  return (
    <MiddleContentHeader
      title="订单详情"
      loading={loading}
      className={styles.wrapper}
    >
      <OrderDetailClientCard order={order} />
      {orderIsWaitForPayment(order) || orderIsCanceled(order) ? null : (
        <Card className={styles.step_card}>
          <OrderDetailSteps order={order} orderStatus={orderStatus} />
        </Card>
      )}
      <Card title="订单信息">
        <div className="orderDetailItem">
          <div className="left-content">订单编号:</div>
          <div className="right-content">{order.order_serial}</div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">服务地址:</div>
          <div className="right-content">{`${order.service_address}`}</div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">服务时间:</div>
          <div className="right-content">
            {moment(order.service_time).format("YYYY-MM-DD HH:mm")}
          </div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">支付状态:</div>
          <div className="right-content">{order.payment_status}</div>
        </div>
        {order.order_products.map((product, index) => {
          return (
            <div key={index}>
              <Divider
                style={{
                  color: "#1677ff",
                  borderColor: "#1677ff",
                  borderStyle: "dashed",
                }}
              />
              <div className="orderDetailItem">
                <div className="left-content">服务项目:</div>
                <div className="right-content" style={{ fontWeight: "bolder" }}>
                  {product.product_name}
                </div>
              </div>
              <div className="orderDetailItem">
                <div className="left-content">服务时常:</div>
                <div className="right-content" style={{ fontWeight: "bolder" }}>
                  {product.duration}
                </div>
              </div>
              <div className="orderDetailItem">
                <div className="left-content">项目价格:</div>
                <div className="right-content" style={{ fontWeight: "bolder" }}>
                  {product.price_current}元
                </div>
              </div>
              <div className="orderDetailItem">
                <div className="left-content">数量:</div>
                <div className="right-content" style={{ fontWeight: "bolder" }}>
                  {product.product_count}
                </div>
              </div>
            </div>
          );
        })}
        <Divider
          style={{
            color: "#1677ff",
            borderColor: "#1677ff",
            borderStyle: "dashed",
          }}
        />
        <div className="orderDetailItem">
          <div className="left-content">距离:</div>
          <div className="right-content">{order.travel_distance} km</div>
        </div>
        {/* <div className="orderDetailItem">
          <div className="left-content">交通费用:</div>
          <div className="right-content money-color">
            {order.travel_cost * 2} 元
          </div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">订单金额:</div>
          <div className="right-content money-color">{order.order_cost} 元</div>
        </div> */}
      </Card>
      <Card
        title="技师收益信息"
        style={{ background: "#fff", border: "1px solid #dbdbdb" }}
      >
        <div className="orderDetailItem">
          <div className="left-content">技师名称:</div>
          <div className="right-content">
            {order.tech.user_nickname}
          </div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">项目总金额:</div>
          <div className="right-content">
            {order.total_fee_paid_by_customer}元
          </div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">优惠券:</div>
          <div className="right-content money-color">
            {order.coupon_value} 元
          </div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">交通费用:</div>
          <div className="right-content money-color">
            {order.travel_cost * 2} 元
          </div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">技师分成:</div>
          <div className="right-conten">{order?.tech?.ratio} %</div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">营业税:</div>
          <div className="right-content money-color">{order.order_products.length * maintainence_fee} 元</div>
        </div>
        <div className="orderDetailItem">
          <div className="left-content">技师收益:</div>
          <div className="right-content money-color">
            {order.tech_benefit}元
          </div>
          {/* 项目收入*技师提成比例+交通费-渠道费 */}
          {/* 渠道费，每单15元，每个项目10元，叠加计算 */}
        </div>
      </Card>
      <div style={{ height: "20px" }}></div>
    </MiddleContentHeader>
  );
};

export default Page;
