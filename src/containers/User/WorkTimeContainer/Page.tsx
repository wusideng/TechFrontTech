import { useState } from "react";
import { Button, Grid, Tabs, Toast } from "antd-mobile";
import { useAppDispatch, useAppSelector } from "@/store";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import TimeBlock from "@/components/user/TimeBlock";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import styles from "./style.module.less";
import { TechWorktimeBlock, TechWorktimeBlocks } from "@/types/TechWorktime";
import {
  saveTechUserWorkTime,
  setTechWorkTimeBlocks,
} from "@/store/slices/worktimeSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const [activeKey, setActiveKey] = useState("0");
  const { worktimeBlocks } = useAppSelector((state) => state.worktime);
  const [fullWorkTimes, setFullWorkTimes] = useState<boolean[]>(
    worktimeBlocks.map(() => true)
  );

  //保存n天的时间设置
  const handleSave = async () => {
    setLoading(true);
    const worktime = worktimeBlocks.flat();
    const worktimes = {
      tech_user_id: user.openid,
      worktime_blocks: worktime,
    };
    await dispatch(saveTechUserWorkTime(worktimes));
    Toast.show({
      icon: "success",
      content: "工作时间保存成功",
    });
    setLoading(false);
    navigate(-1);
  };

  function setTimeAllHandler() {
    const currentFull = fullWorkTimes[parseInt(activeKey)];
    const newFullWorkTimes = fullWorkTimes.map((full, index) => {
      return index.toString() == activeKey ? !full : full;
    });
    setFullWorkTimes(newFullWorkTimes);
    const worktimeBlocksNew: TechWorktimeBlocks = worktimeBlocks.map(
      (dateGroup, dIndex) => {
        return dIndex.toString() === activeKey
          ? dateGroup.map((item) => {
              return { ...item, active: currentFull ? 1 : 0 };
            })
          : dateGroup;
      }
    );
    dispatch(setTechWorkTimeBlocks(worktimeBlocksNew));
  }

  function setTimeHandler(dateIndex: number, slotIndex: number) {
    const worktimeBlocksNew: TechWorktimeBlocks = worktimeBlocks.map(
      (dateGroup, dIndex) => {
        return dIndex === dateIndex
          ? dateGroup.map((item, sIndex) => {
              return sIndex === slotIndex
                ? { ...item, active: item.active === 1 ? 0 : 1 }
                : item;
            })
          : dateGroup;
      }
    );
    dispatch(setTechWorkTimeBlocks(worktimeBlocksNew));
  }
  const renderSubtitle = (date: string) => {
    if (moment(date, "YYYY-MM-DD").isSame(moment(), "day")) {
      return "(今天)";
    }
    return "";
  };
  return (
    <MiddleContentHeader
      title={`工作时间`}
      loading={loading}
      withFooter={false}
      className={styles.wrapper}
    >
      <div className={styles.content_outer_wrapper}>
        <div className={styles.content_inner_wrapper}>
          <Tabs
            activeKey={activeKey}
            onChange={(key) => {
              setActiveKey(key);
            }}
          >
            {worktimeBlocks.map(
              (worktimeDate: TechWorktimeBlock[], dateIndex) => {
                return (
                  <Tabs.Tab
                    title={
                      `${moment(worktimeDate[0].work_date).format("MM-DD")}` +
                      renderSubtitle(worktimeDate[0].work_date)
                    }
                    key={dateIndex.toString()}
                  >
                    <Grid columns={4}>
                      {worktimeDate.map((item, slotIdIndex) => (
                        <Grid.Item>
                          <TimeBlock
                            item={item}
                            key={dateIndex.toString() + slotIdIndex.toString()}
                            onClick={() => {
                              setTimeHandler(dateIndex, slotIdIndex);
                            }}
                          />
                        </Grid.Item>
                      ))}
                    </Grid>
                  </Tabs.Tab>
                );
              }
            )}
          </Tabs>
        </div>
        <div
          className={styles.bottom_button_wrapper}
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: 12,
          }}
        >
          <Button
            block
            color="default"
            onClick={setTimeAllHandler}
            style={{
              borderColor: "var(--adm-color-primary",
              color: "var(--adm-color-primary)",
            }}
          >
            {fullWorkTimes[parseInt(activeKey)] ? "全选" : "反选"}
          </Button>
          <Button block color="primary" onClick={handleSave}>
            保存
          </Button>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default Page;
