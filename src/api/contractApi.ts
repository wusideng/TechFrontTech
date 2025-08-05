// 合约签订（线上签约）
import apiClient from "./apiClient";

export const submitDealerContractApi = async (data) => {
  return await apiClient.post(`/techUserContract/signDealerContract`, data);
};

export const submitPortraitContractApi = async (data) => {
  return await apiClient.post(`/techUserContract/signPortraitContract`, data);
};

export const submitLawContractApi = async (data) => {
  return await apiClient.post(`/techUserContract/signLawContract`, data);
};

export const submitTrainingContractApi = async (data) => {
  return await apiClient.post(`/techUserContract/signTrainingContract`, data);
};

export const fetchContractStatusApi = async (openid, contract_type) => {
  return await apiClient.get(
    `/techUserContract/statusByTechAndType/${openid}/?contract_type=${contract_type}`
  );
};

// export const fetchContractStatus = async (openid) => {
//   return apiClient.get(`/techUserContract/statusByTech/${openid}/`);
// };
