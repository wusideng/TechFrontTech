import { TechUser } from "@/types/TechUser";
import apiClient from "./apiClient";

// 获取微信用户信息
export const fetchUserInfoByWxCode = async (
  code: string
): Promise<TechUser> => {
  return await apiClient.get(`wx/tech_user_info/${code}`);
};

export const fetchUserInfoByOpenId = async (): Promise<TechUser> => {
  // return await apiClient.get(`/techUser/${openid}`, {
  //   withCredentials: true, // 这会使请求发送cookies
  // });
  return await apiClient.get(
    `/techUser/get_tech_user_info_from_cookie/tech_info`,
    {
      withCredentials: true, // 这会使请求发送cookies
    }
  );
};

// 绑定技师手机号码
// req
// {
//   user_id: 'oK9p06eiEk0jWNvowVjb5lGlkocM',
//   user_phone: '13300001115'
// }
// export const updateUserPhoneApi = async (param: {
//   user_id: string;
//   user_phone: string;
// }): Promise<TechUser> => {
//   return await apiClient.post(
//     `/techUser/update_phone/?user_id=${param.user_id}&user_phone=${param.user_phone}`,
//     param
//   );
// };

export const updateTechUserInfoApi = async (
  openid: string,
  techUserInfo: TechUser
): Promise<TechUser> => {
  const res: TechUser = await apiClient.post(
    `/techUserJoinUs/update_info/?user_id=${openid}`,
    techUserInfo
  );
  return res;
};

export const getTechInitialValuesApi = async (openid, user_id) => {
  return await apiClient.get(
    `/techUser/tech_info/get_initial_values?openid=${openid}&user_id=${user_id}`
  );
};
