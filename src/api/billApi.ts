/**
 * 收益计算
 * 技师收益，工资发放，工资统计
 */
import { Bill } from "@/types/Bill";
import apiClient from "./apiClient";

// 技师服务结束，记录收益情况
export const createBillApi = async (bill: Bill): Promise<Bill> => {
  return await apiClient.post("/bill/", bill);
};

// 我的钱包，总收入，已提取，未提取
export const getBillByTechSumApi = async (openid) => {
  return await apiClient.get(`/bill/techSum/${openid}`);
};

export const getBenefitDetailsApi = async (openid) => {
  return await apiClient.get(`/bill/tech_benefit_detail/${openid}`);
};
