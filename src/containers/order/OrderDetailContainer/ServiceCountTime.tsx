import React, { useEffect, useState } from "react";
import moment from "moment";

const ServiceCountTime = ({ state }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const totalDuration = state.orderProducts.reduce((total, product) => {
      const durationMinutes = parseInt(product.duration); // 提取分钟
      return total + durationMinutes; // 累加
    }, 0);

    // 计算推迟后的时间
    const adjustedServiceStartTime = new Date(
      new Date(state.serviceStartTime).getTime() + totalDuration * 60000
    );
    const interval = setInterval(() => {
      // const totalSeconds = Math.floor(
      //   (adjustedServiceStartTime - new Date()) / 1000
      // );
      const totalSeconds = moment(adjustedServiceStartTime).diff(
        new Date(),
        "seconds"
      );

      // 如果 totalSeconds 小于或等于 0，则清除定时器并设置为 0
      if (totalSeconds <= 0) {
        clearInterval(interval);
        setTimeElapsed(0); // 设置为 0
      } else {
        setTimeElapsed(totalSeconds); // 更新倒计时
      }
    }, 1000);
    return () => clearInterval(interval); // 清除定时器
  }, [state.serviceStartTime]);

  const minutes =
    Math.floor(timeElapsed / 60) > -1 ? Math.floor(timeElapsed / 60) : "-";
  const seconds = timeElapsed % 60 > -1 ? timeElapsed % 60 : "-";

  return (
    <>
      {state.orderProducts.map((product) => (
        <div key={product.product_id}>
          {product.product_name}：{product.duration}
        </div>
      ))}
      <div>
        剩余时间：
        <span style={{ color: "red" }}>
          {minutes}分钟 {seconds}秒
        </span>
      </div>
      <div>尚达元，致力于为技师与顾客建立相互信任</div>
      <div>绿色服务，健康生活，是我们尚达元的服务宗旨</div>
    </>
  );
};

export default ServiceCountTime;
