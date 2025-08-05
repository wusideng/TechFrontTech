import { useEffect } from "react";
import moment from "moment";
import { PhoneFill, TravelOutline } from "antd-mobile-icons";
import { Card } from "antd-mobile";
import { useAppDispatch } from "@/store";
import { encryptPhone } from "@/util/config";
import { getOrderClientPostionApi } from "@/api/addressApi";
  

const OrderDetailClientCard = ({ order }) => {
  const dispatch = useAppDispatch();

  // 格式化电话号码显示
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    // 将电话号码转换为数组，每个字符为一个元素
    const phoneArray = phoneNumber.split("");
    // 返回格式化后的电话号码字符串
    return `${phoneArray.slice(0, 3).join("")}****${phoneArray
      .slice(-4)
      .join("")}`;
  };

  const handleDialClick = () => {
    if (encryptPhone) {
      // window.location.href = `tel:02160781570`; // 使用电话协议拨打固定电话
      // window.location.href = `tel:19961318481`; //云信提供替换方案（重庆）；
      window.location.href = `tel:02552451865`; //云信提供替换方案（南京）；
    } else {
      window.location.href = `tel:${order.client.user_phone}`;
    }
    // window.location.href = `tel:${order.client.user_phone}`;
  };

  // 打开高德地图，地图定位到顾客默认地址坐标，位置使用
  const handleOpenAmap = async () => {
    console.log("打开高德app：", getDeviceInfo())
    // console.log("地址信息：", order.client.openid)
    // alert(getDeviceInfo().deviceType+'__V6')
    let resClientAddress: any =  await getOrderClientPostionApi(order.client.openid)
    let addressName = order.service_address
    let lon = resClientAddress.lon
    let lat = resClientAddress.lat
    window.location.href = `http://uri.amap.com/marker?position=${lon},${lat}&name=${addressName}&coordinate=gaode&callnative=1`
  }

  // 设备信息判断
  function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceType = '';
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        deviceType = 'iOS';
    } else if (/Android/i.test(userAgent)) {
        deviceType = 'Android';
    } else {
        deviceType = '其他';
    }
    return {
        userAgent: userAgent,
        platform: navigator.platform,
        deviceType: deviceType
    };
}

  return (
    <Card
      title={order.nickname}
      className="card-style order-detail-client-info-card"
    >
      <div className="orderDetailItem">
        <div className="left-content">客户姓名:</div>
        <div className="right-content">{order.nickname}</div>
      </div>
      <div className="orderDetailItem">
        <div className="left-content">
          客户电话: <PhoneFill fontSize={15} color="blue" />
        </div>
        <span onClick={handleDialClick}>
          {formatPhoneNumber(order.client.user_phone)}
        </span>
        <span className="dial-instruction">（点击拨打电话）</span>
      </div>
      {/* <div className="orderDetailItem">
        <div className="left-content">风险提示:</div>
        <div className="right-content" style={{ color: "red", fontWeight: "bolder" }}>
          {order.client.user_grade}
        </div>
      </div> */}
      <div className="orderDetailItem">
        <div className="left-content">服务地址:</div>
        <div className="right-content">{order.service_address}</div>
      </div>
      <div className="orderDetailItem">
        <div className="left-content">服务时间:</div>
        <div className="right-content">
          {moment(order.service_time).format("YYYY-MM-DD HH:mm")}
        </div>
      </div>
      <div className="orderDetailItem">
        <div className="left-content">一键出行:</div>
        <div className="right-content">
          <TravelOutline color='var(--adm-color-primary)' fontSize={25} onClick={ handleOpenAmap}/>
        </div>
      </div>
      {/* <div className="orderDetailItem">
        <div className="left-content">备注:</div>
        <div className="right-content">{order.remark}</div>
      </div> */}

      
    </Card>
  );
};

export default OrderDetailClientCard;
