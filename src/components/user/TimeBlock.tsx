import { useAppDispatch } from "@/store";
import { useEffect } from "react";

const TimeBlock = ({ item, onClick }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {}, [dispatch]);

  return (
    <>
      {item.active ? (
        <div className="worktime-block" onClick={() => onClick(item)}>
          <div className="worktime">{item.work_time}</div>
          <div>工作</div>
        </div>
      ) : (
        <div className="resttime-block" onClick={() => onClick(item)}>
          <div className="worktime">{item.work_time}</div>
          <div>休息</div>
        </div>
      )}
    </>
  );
};

export default TimeBlock;
