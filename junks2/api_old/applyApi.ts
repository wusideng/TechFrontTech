// /**
//  * 申请上线（上线管理）
//  * Method
//  * 上线申请
//  * 基本信息修改
//  * 生活照上传
//  * 工作照上传
//  * 从业资格证上传
//  */
// import apiClient from "./apiClient";

// // 技师注册，提交注册申请
// export const createApplyStatus = (param) => {
//   return apiClient.post(`/applyStatus/`, param);
// };

// // 读取技师申请
// export const getApplyStatusApi = (openid) => {
//   return apiClient.get(`/applyStatus/tech/${openid}`);
// };

// // 提交技师工作照（待审核）
// export const updateTechWorkPhotoApi = (photo_work, openid) => {
//   return apiClient.post(`/applyStatus/workPhoto/${openid}`, photo_work);
// };

// // 提交技师生活照（待审核）
// export const updateTechLifePhotoApi = (formData, openid) => {
//   return apiClient.post(`applyStatus/lifePhoto/${openid}`, formData);
// };

// // 从业资格证上传
// export const submitCertificateApi = async (formData, openid) => {
//   return apiClient.post(`/applyStatus/certificate/${openid}`, formData);
// };
