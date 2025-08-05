import React from "react";

// 自定义时钟图标组件，支持自定义大小和颜色
// const CustomClockIcon = ({
//   size = "1em", // 默认大小
//   bgColor = "var(--adm-color-primary)", // 默认背景颜色
//   handColor = "white", // 默认指针颜色
// }) => {
//   return (
//     <span
//       style={{
//         display: "inline-flex" /* 保持行内元素性质但使用flex布局 */,
//         alignItems: "center",
//         justifyContent: "center",
//         width: size,
//         height: size,
//         verticalAlign: "middle" /* 这个容器与文本对齐 */,
//       }}
//     >
//       <svg
//         width={size}
//         height={size}
//         viewBox="0 0 48 48"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* 时钟圆形背景 */}
//         <circle cx="24" cy="24" r="20" fill={bgColor} />

//         {/* 时钟指针 */}
//         <path
//           d="M24 16V24L29 29"
//           stroke={handColor}
//           strokeWidth="3"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />

//         {/* 时钟外圈轮廓 - 与背景同色 */}
//         <circle cx="24" cy="24" r="20" stroke={bgColor} strokeWidth="2" />
//       </svg>
//     </span>
//   );
// };
const CustomClockIcon = ({
  size = "1em",
  color = "var(--adm-color-primary)",
}) => {
  return (
    <span
      style={{
        fontSize: size,
        color: color,
        display: "flex",
        alignItems: "center",
        verticalAlign: "middle", // 确保与文本对齐
      }}
    >
      🕓
    </span>
  );
};
export default CustomClockIcon;
// 使用示例:
// <CustomClockIcon size="24px" bgColor="#1677ff" handColor="#ffffff" />
// <CustomClockIcon size="32px" bgColor="red" handColor="yellow" />
// <CustomClockIcon /> {/* 使用默认值 */}
