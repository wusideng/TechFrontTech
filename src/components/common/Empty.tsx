import { Empty } from "antd-mobile";
import { QuestionCircleOutline } from "antd-mobile-icons";

const EmptyContent = ({ style = null, description = null }) => {
  return <Empty description={description || "暂无数据"} />;

  // return (
  //   <div style={{ textAlign: "center", ...style }}>
  //     <p>{description ? description : "暂无数据"}</p>
  //     <QuestionCircleOutline
  //       style={{
  //         color: "var(--adm-color-light)",
  //         fontSize: 48,
  //       }}
  //     />
  //   </div>
  // );
};

export default EmptyContent;
