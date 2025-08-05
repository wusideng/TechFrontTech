import { useEffect } from "react";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { Card, Tabs } from "antd-mobile";
import ApplyItem from "./ApplyItem";
import Empty from "@/components/common/Empty";
import { useAppDispatch, useAppSelector } from "@/store";
import { getApplyStatus } from "@/store/slices/applyStatusSlice";
import styles from "./style.module.less";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/util/config";
import { ApplyStatus } from "@/types/ApplyStatus";

const tabItems = [
  { key: "1", title: "已完成" },
  { key: "2", title: "审批中" },
  { key: "3", title: "已驳回" },
  { key: "4", title: "全部申请" },
];
const getFilteredApplyStatus = (applies: ApplyStatus[], title: string) => {
  switch (title) {
    case "全部申请":
      return applies;
    case "审批中":
      return applies.filter((apply) => apply.apply_status == "apply");
    case "已完成":
      return applies.filter((apply) => apply.apply_status == "approve");
    case "已驳回":
      return applies.filter((apply) => apply.apply_status == "reject");
    default:
      //未识别
      return applies.filter(
        (apply) => !["apply", "approval", "reject"].includes(apply.apply_status)
      );
  }
};
const ApplyStatusContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const { applyStatus } = useAppSelector((state) => state.applyStatus);
  useEffect(() => {
    dispatch(getApplyStatus(user.openid));
  }, [dispatch]);

  return (
    <MiddleContentHeader
      title={"申请状态"}
      withFooter={false}
      className={styles.apply_status_container_wrapper}
    >
      <Tabs defaultActiveKey="1">
        {tabItems.map((item) => {
          const filteredApplyStatus: ApplyStatus[] = getFilteredApplyStatus(
            applyStatus,
            item.title
          );
          return (
            <Tabs.Tab
              title={item.title + `（${filteredApplyStatus.length}）`}
              key={item.key}
            >
              {filteredApplyStatus.length == 0 ? (
                <Empty description="暂无数据" />
              ) : null}
              <div className="item-list-wrapper">
                {filteredApplyStatus.map((apply) => (
                  <Card
                    className="card-style"
                    key={item.key}
                    onClick={() => {
                      navigate(
                        `/${baseUrl}/user/apply/detail/${apply.apply_id}`
                      );
                    }}
                  >
                    <ApplyItem apply={apply} key={item.key} />
                  </Card>
                ))}
              </div>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </MiddleContentHeader>
  );
};

export default ApplyStatusContainer;
