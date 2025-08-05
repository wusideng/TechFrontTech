import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store";
// import CanvasDraw from "react-canvas-draw";
import { Button } from "antd-mobile";
import styles from "./style.module.less";

const SinatureCanvasFull = ({ onCancle, onSave }) => {
  const canvasRef = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  const onClearHander = () => {
    canvasRef.current.clear();
  };

  const onSaveHandler = () => {
    // const data = canvasRef.current.getSaveData();
    const data = canvasRef.current.getDataURL();
    console.log(data);
    onSave(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.canvas_container}></div>
      <div className={styles.buttonContainer}>
        <Button onClick={onSaveHandler} style={{ width: "30%", margin: "5px" }}>
          确定
        </Button>
        <Button onClick={onClearHander} style={{ width: "30%", margin: "5px" }}>
          清除
        </Button>
        <Button onClick={onCancle} style={{ width: "30%", margin: "5px" }}>
          取消
        </Button>
      </div>
    </div>
  );
};

export default SinatureCanvasFull;
