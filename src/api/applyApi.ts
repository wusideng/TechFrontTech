/**
 * Method
 * 上线申请
 * 基本信息修改
 * 生活照上传
 * 工作照上传
 * 从业资格证上传
 */
import { ApplyStatus } from "@/types/ApplyStatus";
import apiClient from "./apiClient";

// 技师注册，提交注册申请
export const createApplyStatusApi = async (param: ApplyStatus) => {
  try {
    const response = await apiClient.post(`/applyStatus/`, param);
    return response;
  } catch (error) {
    throw error;
  }
};
// 读取技师申请
export const getApplyStatusApi = async (openid): Promise<any> => {
  return await apiClient.get(`/applyStatus/tech/${openid}`);
};
export const getApplyingStatusApi = async (openid): Promise<any> => {
  return await apiClient.get(`/applyStatus/tech_applying/${openid}`);
};

// 提交技师工作照（待审核）
export const updateTechWorkPhotoApi = async (photo_work, openid) => {
  return await apiClient.post(`/applyStatus/workPhoto/${openid}`, photo_work);
};

// 提交技师生活照（待审核）
export const updateTechLifePhotoApi = async (formData, openid) => {
  return await apiClient.post(`applyStatus/lifePhoto/${openid}`, formData);
};

// 从业资格证上传
export const submitCertificateApi = async (formData, openid) => {
  return await apiClient.post(`/applyStatus/certificate/${openid}`, formData);
};
