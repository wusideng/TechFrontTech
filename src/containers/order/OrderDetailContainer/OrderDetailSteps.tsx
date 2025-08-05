import { useEffect, useState } from "react";
import { Button, Image, ImageViewer, Steps } from "antd-mobile";

import moment from "moment/moment";
import { baseUrl } from "@/util/config";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";

import ServiceCountTime from "./ServiceCountTime";
import { useAppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";
import {
  getOrder,
  getOrderStatus,
  updateOrderStatus,
} from "@/store/slices/orderSlice";
import { createBill } from "@/store/slices/billSlice";

const techStatusCodeDict = orderStatusCodeDict.tech;
const { Step } = Steps;

const getSteps = (operations, state) => {
  return [
    {
      title: "准备接单",
      confirmDesc: "已确认接单",
      finishCode: techStatusCodeDict.confirm_take_order.code,
      desc: (
        <>
          <div>请技师在5分钟之内接单</div>
          <div>致电顾客电话确认服务时间和地址</div>
        </>
      ),
      operation: {
        text: "我要接单",
        func: () =>
          operations.updateOrderHandler(techStatusCodeDict.confirm_take_order),
      },
    },
    {
      title: "准备出发",
      confirmDesc: "已确认出发",
      finishCode: techStatusCodeDict.has_on_the_way.code,
      desc: (
        <>
          <div>请及时出发</div>
          <div>请注意交通安全，祝您一路顺风</div>
        </>
      ),
      operation: {
        text: "我要出发",
        func: () => operations.departBeginHandler(),
      },
      uploadedImage: {
        src: state.departBeginPhoto,
        visible: state.departBeginVisible,
        open: () => operations.setDepartBeginVisible(true),
        close: () => operations.setDepartBeginVisible(false),
      },
    },
    {
      title: "确认到达",
      confirmDesc: "已确认到达",
      finishCode: techStatusCodeDict.has_arrived.code,
      desc: (
        <>
          <div>请技师着装整洁</div>
          <div>请注意个人安全保持电话畅通</div>
        </>
      ),
      operation: {
        text: "我已到达",
        func: () =>
          operations.updateOrderHandler(techStatusCodeDict.has_arrived),
      },
    },
    {
      title: "开始服务",
      confirmDesc: "已开始服务",
      finishCode: techStatusCodeDict.start_service.code,
      desc: <ServiceCountTime state={state} />,
      operation: {
        text: "开始服务",
        func: () =>
          operations.updateOrderHandler(techStatusCodeDict.start_service),
      },
    },
    {
      title: "服务完成",
      confirmDesc: "已结束服务",
      finishCode: techStatusCodeDict.service_end.code,
      desc: (
        <>
          <div>如提前结束服务，请确认顾客已经点击“服务完成”</div>
          <div>或者产品服务时间已到达</div>
        </>
      ),
      operation: {
        text: "服务完成",
        func: () =>
          operations.updateOrderHandler(techStatusCodeDict.service_end),
      },
    },
    {
      title: "确认离开",
      confirmDesc: "已离开",
      finishCode: techStatusCodeDict.has_left.code,
      desc: (
        <>
          <div>感谢您选择尚达元</div>
          <div>祝您生活愉快</div>
        </>
      ),
      uploadedImage: {
        src: state.departEndPhoto,
        visible: state.departEndVisible,
        open: () => operations.setDepartEndVisible(true),
        close: () => operations.setDepartEndVisible(false),
      },
      operation: {
        text: "确认离开",
        func: () => operations.departEndHandler(),
      },
    },
    {
      title: "订单结束",
    },
  ];
};

const OrderDetailSteps = ({ order, orderStatus }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deliverStep, setDeliverStep] = useState(0);
  const [departBeginVisible, setDepartBeginVisible] = useState(false);
  const [departEndVisible, setDepartEndVisible] = useState(false);

  const setCurrentStep = () => {
    const latestStep = order.order_status_code_tech;
    switch (latestStep) {
      case null:
      case undefined:
      case "":
      case techStatusCodeDict.wait_for_take_order.code:
        setDeliverStep(0);
        break;
      case techStatusCodeDict.confirm_take_order.code:
        setDeliverStep(1);
        break;
      case techStatusCodeDict.has_on_the_way.code:
        setDeliverStep(2);
        break;
      case techStatusCodeDict.has_arrived.code:
        setDeliverStep(3);
        break;
      case techStatusCodeDict.start_service.code:
        setDeliverStep(4);
        break;
      case techStatusCodeDict.service_end.code:
        setDeliverStep(5);
        break;
      case techStatusCodeDict.has_left.code:
        setDeliverStep(6);
        break;
      default:
        setDeliverStep(7);
    }
  };
  const updateOrderHandler = async (status) => {
    let newOrderStatus = {
      order_id: order.order_id,
      order_status_type_code: status.code,
      order_status_type: status.text,
      order_operator: "tech",
    };
    //todo_cheng, 这里没必要调用如此多的接口
    await dispatch(updateOrderStatus(newOrderStatus));
    await dispatch(getOrderStatus(order.order_id));
    await dispatch(getOrder(order.order_id));
  };
  const departBeginHandler = () => {
    navigate(`/${baseUrl}/order/${order.order_id}/departBegin`);
  };
  // 技师点击离开，上传照片
  const departEndHandler = () => {
    navigate(`/${baseUrl}/order/${order.order_id}/departEnd`);
  };
  const steps = getSteps(
    {
      setDepartBeginVisible,
      setDepartEndVisible,
      departBeginHandler,
      updateOrderHandler,
      departEndHandler,
    },
    {
      departBeginVisible,
      departEndVisible,
      departBeginPhoto: orderStatus.find(
        (order) =>
          order.order_status_type_code ===
          techStatusCodeDict.has_on_the_way.code
      )?.order_status_photo,
      departEndPhoto: orderStatus.find(
        (order) =>
          order.order_status_type_code === techStatusCodeDict.has_left.code
      )?.order_status_photo,
      orderProducts: order.order_products,
      serviceStartTime: orderStatus.find(
        (status) => status.order_status_type_code == "order_025"
      )?.order_status_time,
    }
  );

  const renderFinishDesc = (currentStep) => {
    if (!steps[currentStep].finishCode) {
      return null;
    }
    const finishTime = orderStatus.find(
      (order) => order.order_status_type_code === steps[currentStep].finishCode
    )?.order_status_time;
    if (finishTime) {
      return (
        <div>
          {steps[currentStep].confirmDesc}：
          {moment(finishTime).format("YYYY-MM-DD HH:mm:ss")}
        </div>
      );
    }
    return null;
  };

  const renderImage = ({ src, visible, open, close }) => {
    return (
      <>
        <Image
          src={src}
          width={96}
          height={96}
          fit="cover"
          onClick={() => {
            open();
          }}
          style={{ borderRadius: 8 }}
        />
        <ImageViewer
          image={src}
          visible={visible}
          onClose={() => {
            close();
          }}
        />
      </>
    );
  };
  const renderOperationButton = (operation) => {
    return (
      <Button
        block
        color="primary"
        style={{
          fontSize: 14,
          marginTop: 5,
        }}
        onClick={operation.func}
      >
        {operation.text}
      </Button>
    );
  };
  const renderStepInfo = (currentStep) => {
    if (!steps[currentStep].finishCode) {
      return null;
    }
    const isConfirmed = currentStep < deliverStep;
    return (
      <div>
        <div>{renderFinishDesc(currentStep)}</div>
        {steps[currentStep].desc}
        {isConfirmed && steps[currentStep].uploadedImage
          ? renderImage(steps[currentStep].uploadedImage)
          : null}
        {deliverStep == currentStep
          ? renderOperationButton(steps[currentStep].operation)
          : null}
      </div>
    );
  };
  useEffect(() => {
    if (order.order_id) {
      setCurrentStep();
    }
  }, [order]);
  return (
    <Steps
      direction="vertical"
      current={deliverStep}
      style={{
        "--title-font-size": "15px",
        "--description-font-size": "12px",
        "--indicator-margin-right": "12px",
        "--icon-size": "22px",
      }}
    >
      {steps.map((step, index) => {
        return (
          <Step
            key={index}
            title={step.title}
            description={renderStepInfo(index)}
          />
        );
      })}
      {/* 新增技师对客户评价 */}
      <div>
        {deliverStep == 6 ? (
          <></>
        ) : // <Button style={{ marginLeft: "30px" }} size="small" color="primary">
        //   去评论
        // </Button>
        null}
      </div>
    </Steps>
  );
};
export default OrderDetailSteps;
