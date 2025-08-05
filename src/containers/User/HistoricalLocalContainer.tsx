import React, { useEffect } from "react";
import { getFormattedDateMin } from "@/util/wxUtil";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { Card } from "antd-mobile";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTechUserHistoryLocal } from "@/store/slices/addressSlice";

const HistoricalLocalContainer = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const { historyLocal } = useAppSelector((state) => state.address); // 确保路径正确
  useEffect(() => {
    dispatch(
      getTechUserHistoryLocal({ openid: user.openid, pageNum: 0, pageSize: 10 })
    );
  }, [dispatch]);

  return (
    <MiddleContentHeader
      title={"历史轨迹"}
      withFooter={false}
      className="location-history-track-container"
    >
      <div
        style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "10px" }}
      >
        接单位置
      </div>

      {historyLocal.map((item, index) => {
        return (
          <Card className="card-style" key={index}>
            <LocalComponent position={item} />
          </Card>
        );
      })}
    </MiddleContentHeader>
  );
};

export default HistoricalLocalContainer;

const LocalComponent = ({ position }) => {
  return (
    <div className="apply_item">
      <div className="apply_item_cardheader">
        <div className="apply_item_type">{`${position?.work_city}`}</div>
        <div className="apply_item_status">
          {getFormattedDateMin(new Date(position?.refresh_time))}
        </div>
      </div>
      <div className="apply_item_content">
        <div>地址：{position.address}</div>
        <div>坐标：{`${position.lon}, ${position.lat}`}</div>
      </div>
    </div>
  );
};
