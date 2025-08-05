import { Address } from "@/types/Address";
import apiClient from "./apiClient";

// 读取顾客位置信息，用于技师接单导航
export const getOrderClientPostionApi = async (openid): Promise<any[]> => {
  return await apiClient.get(`/user/addresses/default?openid=${openid}`);
};


// // 读取技师历史位置
export const getTechUserHistoryLocalApi = async (
  openid: string,
  pageNum: number,
  pageSize: number
): Promise<any[]> => {
  return await apiClient.get(
    `/techUserPosition/tech/${openid}?pageNum=${pageNum}&pageSize=${pageSize}`
  );
};

export const getOpenCitiesApi = async (): Promise<any[]> => {
  return await apiClient.get(`/city/open_cities`);
};

export const getTechAddressesApi = async (openid): Promise<any[]> => {
  return await apiClient.get(`/techAddress/addresses?openid=${openid}`);
};

export const getTechDefaultAddressApi = async (
  openid: string
): Promise<Address> => {
  return await apiClient.get(`/techAddress/addresses/default?openid=${openid}`);
};

// 添加新地址
export const addTechAddressApi = (address: Address): Promise<Address> => {
  console.log("post");
  return apiClient.post("/techAddress/addresses", address);
};

// 更新地址
export const updateTechAddressApi = (
  addressId: number,
  address: Address
): Promise<Address> => {
  return apiClient.put(`/techAddress/addresses/${addressId}`, address);
};

// 删除地址
export const deleteTechAddressApi = (addressId: number) => {
  return apiClient.delete(`/techAddress/addresses/${addressId}`);
};
