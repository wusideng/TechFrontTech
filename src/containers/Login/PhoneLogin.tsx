// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/store";
// import { useNavigate } from "react-router-dom";

// import { Button, Form, Input, Toast } from "antd-mobile";
// import { baseUrl } from "@/util/config";

// import BlockA from "@/components/common/BlockA";
// import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
// import { updateUserPhone } from "@/store/slices/userSlice";

// const PhoneLoginContainer = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { user } = useAppSelector((state) => state.user); // 确保路径正确

//   function onFinish(values) {
//     const { phoneNumber } = values;
//     let reqparam = {
//       user_id: user.openid,
//       user_phone: phoneNumber,
//     };
//     dispatch(updateUserPhone(reqparam));
//     Toast.show({
//       icon: "success",
//       content: "手机号码绑定成功",
//     });
//     setTimeout(() => {
//       navigate(`/${baseUrl}/`);
//     }, 1000);
//   }

//   const validateMessages = {
//     // required: "请填写'${name}' ",
//     required: "请填写手机号码",
//     // ...
//   };

//   return (
//     <MiddleContentHeader title={"手机号绑定"}>
//       <div className="login">
//         <div className="advertising">
//           <p>您好，</p>
//           <p>欢迎使用尚达元</p>
//         </div>
//         <BlockA title={"手机号码绑定（手机号快捷登陆）"}>
//           <Form
//             layout="horizontal"
//             onFinish={onFinish}
//             initialValues={{
//               phoneNumber: "",
//             }}
//             validateMessages={validateMessages}
//             footer={
//               <Button block type="submit" color="primary" size="large">
//                 提交
//               </Button>
//             }
//           >
//             <Form.Item
//               name="phoneNumber"
//               label="手机号"
//               rules={[
//                 { required: true },
//                 {
//                   type: "string",
//                   pattern: /^[1][3-9][0-9]{9}$/,
//                   message: "请输入有效的手机号码",
//                 },
//               ]}
//             >
//               <Input placeholder="请输入手机号码" />
//             </Form.Item>

//             {/* <Form.Item label='短信验证码' extra={<Button size='mini' color='primary' disabled>获取验证码</Button>}>
//               <Input placeholder='请输入验证码' disabled />
//             </Form.Item> */}
//           </Form>
//         </BlockA>
//       </div>
//     </MiddleContentHeader>
//   );
// };

// export default PhoneLoginContainer;
