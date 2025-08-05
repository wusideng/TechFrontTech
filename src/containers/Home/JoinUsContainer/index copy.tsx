// import { RefObject, useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/store";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Card,
//   Divider,
//   Form,
//   Input,
//   Picker,
//   Radio,
//   TextArea,
//   Toast,
// } from "antd-mobile";
// import type { PickerRef } from "antd-mobile/es/components/picker";

// import { createApplyStatus } from "@/api/applyApi";
// import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
// import styles from "./style.module.less";
// import { bankTypeOptions, cityPickerOption } from "./pickerOptions";
// import { baseUrl } from "@/util/config";

// const JoinUsContainer = () => {
//   const navigate = useNavigate();
//   const { user } = useAppSelector((state) => state.user); // 确保路径正确
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const { address } = useAppSelector((state) => state.address);

//   const handleFinishFailed = (errorInfo) => {
//     const errorfield = errorInfo.errorFields[0].errors[0];
//     console.log(errorfield);
//     Toast.show({
//       content: errorfield,
//     });
//     return;
//   };
//   async function handleSubmit(values) {
//     let techUserInfo = {
//       ...values,
//       apply_type: "tech_join",
//       apply_status: "apply",
//     };
//     try {
//       await createApplyStatus(techUserInfo);
//       Toast.show({
//         content: '申请已提交，可在 "申请状态"  查看审核进度',
//       });
//       navigate(-1);
//     } catch (err) {
//       const detail = err?.response?.data?.detail;
//       setLoading(false);
//       detail &&
//         Toast.show({
//           content: detail,
//         });
//     }
//   }

//   const validateMessages = {
//     // required: "请填写'${name}' ",
//     required: "请填写手机号码",
//     // ...
//   };

//   return (
//     <MiddleContentHeader
//       title={"加入我们"}
//       goBack={() => {
//         navigate(`/${baseUrl}`);
//       }}
//       withFooter={false}
//       className={styles.join_us_container_wrapper}
//       loading={loading}
//     >
//       <div className={styles.join_us_container}>
//         <div className={styles.form_card_wrapper}>
//           <div className={styles.advertising}>
//             <p>欢迎加入尚达元!!</p>
//             <p>加入我们，成为专业技师！</p>
//           </div>
//           <Card title={"请填写个人信息"} className={styles.form_card}>
//             <Form
//               form={form}
//               layout="horizontal"
//               onFinish={handleSubmit}
//               onFinishFailed={handleFinishFailed}
//               initialValues={{
//                 work_phone: user?.work_phone,
//                 user_phone: user?.user_phone,
//                 user_sex: user?.user_sex,
//                 user_nickname: user?.user_nickname,
//                 user_age: user?.user_age,
//                 work_city: address?.work_city,
//                 user_desc: user?.user_desc,
//               }}
//               validateMessages={validateMessages}
//             >
//               <Divider
//                 style={{
//                   color: "#1677ff",
//                   borderColor: "#1677ff",
//                   borderStyle: "dashed",
//                 }}
//               >
//                 基本信息
//               </Divider>
//               <Form.Item
//                 name="work_city"
//                 label="选择城市"
//                 rules={[{ required: true, message: "请选择城市" }]}
//                 trigger="onConfirm"
//                 onClick={(e, pickerRef: RefObject<PickerRef>) => {
//                   pickerRef.current?.open();
//                 }}
//               >
//                 <Picker columns={[cityPickerOption]}>
//                   {(value) => {
//                     return value[0]?.value ? value[0]?.value : "请选择城市";
//                   }}
//                 </Picker>
//               </Form.Item>

//               <Form.Item
//                 name="user_phone"
//                 label="个人电话"
//                 rules={[
//                   { required: true, message: "请输入个人手机号码" },
//                   {
//                     pattern: /^1[3-9]\d{9}$/,
//                     message: "请输入正确的个人手机号码",
//                   },
//                 ]}
//               >
//                 <Input type="tel" clearable placeholder="请输入个人手机号码" />
//               </Form.Item>
//               <Form.Item
//                 name="work_phone"
//                 label="接单电话"
//                 rules={[
//                   { required: true, message: "请输入接单手机号码" },
//                   {
//                     pattern: /^1[3-9]\d{9}$/,
//                     message: "请输入正确的接单手机号码",
//                   },
//                 ]}
//               >
//                 <Input type="tel" clearable placeholder="请输入接单手机号码" />
//               </Form.Item>

//               <Form.Item
//                 name="user_nickname"
//                 label="艺名"
//                 rules={[{ required: true, message: "请输入姓名" }]}
//               >
//                 <Input placeholder="请输入姓名" />
//               </Form.Item>

//               <Form.Item
//                 name="user_age"
//                 label="年龄"
//                 rules={[{ required: true, message: "请输入年龄" }]}
//               >
//                 <Input type="number" placeholder="请输入年龄" />
//               </Form.Item>

//               <Form.Item
//                 name="user_sex"
//                 label="性别"
//                 rules={[{ required: true, message: "请选择性别" }]}
//               >
//                 <Radio.Group defaultValue="女">
//                   <Radio value="女" style={{ marginRight: "20px" }}>
//                     女
//                   </Radio>
//                   <Radio value="男">男</Radio>
//                 </Radio.Group>
//               </Form.Item>
//               <Divider
//                 style={{
//                   color: "#1677ff",
//                   borderColor: "#1677ff",
//                   borderStyle: "dashed",
//                 }}
//               >
//                 上线信息
//               </Divider>
//               <Form.Item
//                 layout="vertical"
//                 name="user_desc"
//                 label="个人介绍"
//                 rules={[{ required: true, message: "请输个人介绍" }]}
//               >
//                 <TextArea
//                   placeholder="请输个人介绍"
//                   autoSize={{ minRows: 3, maxRows: 5 }}
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="bank_card_type"
//                 label="银行卡类型"
//                 rules={[{ required: false, message: "请选择银行卡类型" }]}
//                 trigger="onConfirm"
//                 onClick={(e, pickerRef: RefObject<PickerRef>) => {
//                   pickerRef.current?.open();
//                 }}
//               >
//                 <Picker columns={[bankTypeOptions]}>
//                   {(value) => {
//                     return value[0]?.value
//                       ? value[0]?.value
//                       : "请选择银行卡类型";
//                   }}
//                 </Picker>
//               </Form.Item>

//               <Form.Item
//                 layout="vertical"
//                 name="bank_card_id"
//                 label="银行卡号"
//                 rules={[
//                   {
//                     pattern: /^[0-9]{16,19}$/,
//                     message: "请输入有效的银行卡号（16-19位数字）",
//                   },
//                 ]}
//               >
//                 <Input type="number" placeholder="请输入银行卡号" />
//               </Form.Item>
//             </Form>
//           </Card>
//         </div>
//         <div className={styles.submit_button_wrapper}>
//           <Button
//             block
//             type="submit"
//             color="primary"
//             size="large"
//             onClick={() => {
//               form.submit();
//             }}
//           >
//             提交申请
//           </Button>
//         </div>
//       </div>
//     </MiddleContentHeader>
//   );
// };

// export default JoinUsContainer;
