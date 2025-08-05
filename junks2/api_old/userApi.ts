// import apiClient from "./apiClient";
// import apiExtClient from "./apiExtClient";
// const amapTypes =
//   "门牌信息,门牌信息,楼宇,商务写字楼,商务住宅,住宅小区,住宿服务,生活服务场所,购物服务,餐饮服务,地名地址信息,公司企业,交通设施服务,风景名胜,";

// // 读取技师信息
// export const fetchTechUserInfo = (openid) => {
//   return apiClient.get(`/techUser/${openid}`);
// };

// // 获取微信用户信息
// export const fetchWxUserInfo = (code) => {
//   return apiClient.get(`wx/userInfo/${code}`);
// };

// // // 获取微信用户Ticket
// // export const fetchJsapiTicket = (url) => {
// //   return apiClient.get(`/wx/get_jsapi_ticket?url=${url}`);
// // };

// // 获取微信用户地址信息
// // export const fetchLBSAddress = (lon, lat) => {
// //   return apiExtClient.get(
// //     `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lon},${lat}&key=1c4a139d09e6d072011d125b6d54d4e6&radius=1000&extensions=all`
// //   );
// // };

// // 获取微信用户路径分析，距离计算
// // export const fetchPathAnalysis = (lon1, lat1, lon2, lat2) => {
// //   return apiExtClient.get(
// //     `https://restapi.amap.com/v5/direction/driving?origin=${lon1},${lat1}&destination=${lon2},${lat2}&key=1c4a139d09e6d072011d125b6d54d4e6`
// //   );
// // };

// // （高德）获取用户周边地址信息500以内
// // export const getLBSAddressAmapApi = async (lon, lat) => {
// //   return apiExtClient.get(
// //     `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lon},${lat}&key=1c4a139d09e6d072011d125b6d54d4e6&radius=500&extensions=all`
// //   );
// //   // console.log("getLBSAddressAmap:", lon, lat);
// //   // let res = await apiExtClient.get(
// //   //   `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lon},${lat}&key=1c4a139d09e6d072011d125b6d54d4e6&radius=500&extensions=all`
// //   // );
// //   // return res;
// // };

// // 微信登陆认证，没有注册的进行注册，已经注册的返回客户信息，根据openid进行查询
// // export const wechatLogin = (openid, headimgurl, nickname) => {
// //   return apiClient.get(
// //     `techUser/wechat_login/${openid}?headimgurl=${headimgurl}&nickname=${nickname}`
// //   );
// // };

// // 绑定技师手机号码
// // {user_id: 'oK9p06eiEk0jWNvowVjb5lGlkocM',user_phone: '13300001115'}
// export const updateUserPhoneApi = (param) => {
//   return apiClient.post(
//     `/techUser/update_phone/?user_id=${param.user_id}&user_phone=${param.user_phone}`,
//     param
//   );
// };

// // 技师注册，补全技师信息
// export const updateTechUserInfoApi = (openid, techUserInfo) => {
//   return apiClient.post(
//     `/techUserJoinUs/update_info/?user_id=${openid}`,
//     techUserInfo
//   );
// };

// // 添加技师位置信息
// // tech_user_id: int
// // refresh_time: datetime
// // lon: Decimal
// // lat: Decimal
// // address: str
// export const addTechUserPositionApi = (techUserPosition) => {
//   console.log("addTechUserPosition:", techUserPosition);
//   return apiClient.post(`/techUserPosition/`, techUserPosition);
// };

// // 读取技师历史位置
// export const getTechUserHistoryLocalApi = (openid, pageNum, pageSize) => {
//   return apiClient.get(
//     `/techUserPosition/tech/${openid}?pageNum=${pageNum}&pageSize=${pageSize}`
//   );
// };

// // （高德）根据文本查询周围
// export const fetchPois = (keyword, lon, lat, city) => {
//   if (keyword == "") {
//     return apiExtClient.get(
//       `https://restapi.amap.com/v3/place/text?keywords=${"酒店"}&location=${lon},${lat}&city=${city}&offset=20&page=1&extensions=all&types=${amapTypes}&key=1c4a139d09e6d072011d125b6d54d4e6`
//     );
//   } else {
//     return apiExtClient.get(
//       `https://restapi.amap.com/v3/place/text?keywords=${keyword}&location=${lon},${lat}&city=${city}&offset=20&page=1&extensions=all&types=${amapTypes}&key=1c4a139d09e6d072011d125b6d54d4e6`
//     );
//   }
// };
// // (高德)查询周围
// export const fetchPoiAround = (lon, lat) => {
//   return apiExtClient.get(
//     `https://restapi.amap.com/v3/place/around?location=${lon},${lat}&types=${amapTypes}&key=1c4a139d09e6d072011d125b6d54d4e6`
//   );
// };

// // 保存技师工作时间
// export const saveTechUserWorkTimeApi = (worktime_blocks) => {
//   return apiClient.post(`/techUserWorktime/worktimeBlocks/`, worktime_blocks);
// };

// // 读取技师工作时间
// export const getTechUserWorkTimeApi = (openid) => {
//   return apiClient.get(`/techUserWorktime/worktimeBlocksFromTech/${openid}`);
// };
