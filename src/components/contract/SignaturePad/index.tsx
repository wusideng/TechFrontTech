import React, { useRef, useState, useEffect } from "react";
import { Button, Toast } from "antd-mobile";
import { CloseOutline, CheckOutline, DeleteOutline } from "antd-mobile-icons";
import SignatureCanvas from "react-signature-canvas";
import { createPortal } from "react-dom";
import styles from "./style.module.less";
const SignaturePad = ({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (signature) => void;
}) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  // 移动端横屏
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    //@ts-ignore
    if (isMobile && screen.orientation?.lock) {
      //@ts-ignore
      screen.orientation.lock("landscape").catch(() => {});

      return () => {
        screen.orientation.unlock?.();
      };
    }
  }, []);

  const handleBegin = () => setIsEmpty(false);
  const handleClear = () => {
    sigCanvasRef.current?.clear();
    setIsEmpty(true);
  };

  const handleSave = () => {
    console.log("handlesave");
    if (isEmpty || sigCanvasRef.current?.isEmpty()) {
      Toast.show({
        content: "请先进行签名",
        maskClassName: styles.toast,
      });
      return;
    }
    const signature = sigCanvasRef.current?.toDataURL("image/png");
    Toast.show({
      content: "签名保存成功",
      maskClassName: styles.toast,
    });
    if (signature) {
      onSave(signature);
      Toast.show("签名保存成功");
    }
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 头部 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Button size="small" fill="none" onClick={onCancel}>
          <CloseOutline /> 取消
        </Button>
        <span style={{ fontSize: "18px", fontWeight: 500 }}>电子签名</span>
        <Button
          size="small"
          fill="none"
          onClick={handleSave}
          style={{ color: "#1677ff" }}
        >
          <CheckOutline /> 确定
        </Button>
      </div>

      {/* 签名区域 */}
      <div style={{ flex: 1, position: "relative" }}>
        <SignatureCanvas
          ref={sigCanvasRef}
          canvasProps={{
            style: {
              width: "100%",
              height: "100%",
              background: "#fafafa",
              touchAction: "none",
            },
          }}
          backgroundColor="#fafafa"
          penColor="#000000"
          minWidth={1}
          maxWidth={3}
          onBegin={handleBegin}
        />

        {isEmpty && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#999",
              fontSize: "18px",
              pointerEvents: "none",
            }}
          >
            请在此区域签名
          </div>
        )}
      </div>

      {/* 底部 */}
      <div style={{ padding: "16px", borderTop: "1px solid #e5e5e5" }}>
        <Button
          block
          fill="outline"
          onClick={handleClear}
          style={{ color: "#ff4d4f", borderColor: "#ff4d4f" }}
        >
          <DeleteOutline /> 清除重写
        </Button>
      </div>
    </div>,
    document.body
  );
};

export default SignaturePad;
