// import React, {
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
//   useEffect,
// } from "react";
// import { Button } from "antd-mobile";
// import styles from "./style.module.less";
// const SignatureCanvas = forwardRef(
//   ({ value, onChange, isFullscreen, onExitFullscreen }, ref) => {
//     // const SignatureCanvas = ({ value, onChange }) => {
//     const canvasRef = useRef(null);
//     const [drawing, setDrawing] = useState(false);

//     const startDrawing = (e) => {
//       console.log("onTouchStart triggered"); // 添加此行以验证事件触发
//       const touch = e.touches[0]; // 获取第一个触摸点
//       setDrawing(true);
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.beginPath();
//       ctx.moveTo(
//         touch.clientX - canvasRef.current.getBoundingClientRect().left,
//         touch.clientY - canvasRef.current.getBoundingClientRect().top
//       );
//     };

//     const draw = (e) => {
//       if (!drawing) return;
//       console.log("onTouchDraw triggered"); // 添加此行以验证事件触
//       const touch = e.touches[0]; // 获取第一个触摸点
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.lineTo(
//         touch.clientX - canvasRef.current.getBoundingClientRect().left,
//         touch.clientY - canvasRef.current.getBoundingClientRect().top
//       );
//       ctx.stroke();
//     };

//     const stopDrawing = () => {
//       console.log("onTouchStop triggered"); // 添加此行以验证事件触

//       setDrawing(false);
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.closePath();
//       const dataURL = canvasRef.current.toDataURL("image/png");
//       onChange(dataURL);
//     };

//     useEffect(() => {
//       if (value) {
//         const img = new Image();
//         img.src = value;
//         img.onload = () => {
//           const ctx = canvasRef.current.getContext("2d");
//           canvasRef.current.width = img.width;
//           canvasRef.current.height = img.height;
//           ctx.drawImage(img, 0, 0);
//         };
//       }
//     }, [value]);

//     const handleClear = () => {
//       setDrawing(false);
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//       onChange(null);
//     };

//     useImperativeHandle(ref, () => ({
//       handleClear,
//     }));

//     // const canvasStyle = {
//     //   border: "1px solid #000",
//     //   backgroundColor: "white",
//     //   ...(!isFullscreen
//     //     ? { width: "300px", height: "100px" }
//     //     : {
//     //         width: "100vw",
//     //         height: "100vh",
//     //         border: "1px solid #000",
//     //         position: "fixed",
//     //         top: 0,
//     //         left: 0,
//     //         zIndex: 1000,
//     //       }),
//     // };

//     return (
//       <div style={{ position: "relative", width: "100%", height: "100%" }}>
//         {isFullscreen && (
//           <Button
//             onClick={onExitFullscreen}
//             style={{
//               position: "fixed",
//               top: "20px",
//               right: "20px",
//               zIndex: 1001, // 确保退出按钮位于画布之上
//             }}
//           >
//             退出全屏
//           </Button>
//         )}
//         <canvas
//           ref={canvasRef}
//           className={
//             isFullscreen
//               ? styles.canvas_full_screen
//               : styles.canvas_non_full_screen
//           }
//           onTouchStart={startDrawing}
//           onTouchMove={draw}
//           onTouchEnd={stopDrawing}
//           onTouchCancel={stopDrawing}
//         />
//       </div>
//     );
//   }
// );

// export default SignatureCanvas;
