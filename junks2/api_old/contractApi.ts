// // 合约签订（线上签约）
// import apiClient from "./apiClient";

// export const submitDealerContractApi = async (data) => {
//   return apiClient.post(`/techUserContract/signDealerContract`, data);
// };

// export const submitPortraitContractApi = async (data) => {
//   return apiClient.post(`/techUserContract/signPortraitContract`, data);
// };

// export const submitLawContractApi = async (data) => {
//   return apiClient.post(`/techUserContract/signLawContract`, data);
// };

// export const submitTrainingContractApi = async (data) => {
//   return apiClient.post(`/techUserContract/signTrainingContract`, data);
// };

// export const fetchContractStatus = async (openid, contract_type) => {
//   return apiClient.get(
//     `/techUserContract/statusByTechAndType/${openid}/?contract_type=${contract_type}`
//   );
// };

// // export const fetchContractStatus = async (openid) => {
// //   return apiClient.get(`/techUserContract/statusByTech/${openid}/`);
// // };
