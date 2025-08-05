// // src/actions/userActions.js
// import { Toast } from "antd-mobile";

// import {
//   fetchTechUserInfo,
//   fetchJsapiTicket,
//   fetchWxUserInfo,
//   fetchLBSAddress,
//   getLBSAddressAmapApi,
//   fetchPathAnalysis,
//   wechatLogin,
//   updateUserPhoneApi,
//   updateTechUserInfoApi,
//   addTechUserPositionApi,
//   saveTechUserWorkTimeApi,
//   getTechUserWorkTimeApi,
// } from "@/api/userApi";
// import { apiUrl } from "@/util/config";
// import { getCityByWxAddress } from "@/util/wxUtil";
// import mockWxUser from "@/lib/mockWxUserjc.json";
// import mockUserPhone from "@/lib/mockUserPhonejc.json";
// // import mockWxUser from "@/lib/mockWxUserhd.json";
// // import mockUserPhone from "@/lib/mockUserPhonehd.json";

// export const COMMON_USER_REQUEST = "COMMON_USER_REQUEST";
// export const COMMON_USER_FAILURE = "COMMON_USER_FAILURE";

// export const LOAD_TECHUSER_SUCCESS = "LOAD_TECHUSER_SUCCESS";
// export const LOAD_ADDRESS_SUCCESS = "LOAD_ADDRESS_SUCCESS";
// export const LOAD_JSAPITICKET_SUCCESS = "LOAD_JSAPITICKET_SUCCESS";
// export const LOAD_WXUSERINFO_SUCCESS = "LOAD_WXUSERINFO_SUCCESS";
// export const LOAD_SAVEWORKTIME_SUCCESS = "LOAD_SAVEWORKTIME_SUCCESS";
// export const LOAD_GETWORKTIME_SUCCESS = "LOAD_GETWORKTIME_SUCCESS";
// export const LOAD_MOCKLBSADDRESS_SUCCESS = "LOAD_MOCKLBSADDRESS_SUCCESS";
// export const LOAD_PATHANALYSIS_SUCCESS = "LOAD_PATHANALYSIS_SUCCESS";
// export const LOAD_WECHATLOGIN_SUCCESS = "LOAD_WECHATLOGIN_SUCCESS";
// export const LOAD_UPDATE_USERPHONE_SUCCESS = "LOAD_UPDATE_USERPHONE_SUCCESS";

// export const SET_WX_CODE = "SET_WX_CODE";
// export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
// export const SET_WX_USER = "SET_WX_USER";
// export const SET_DEVICE = "SET_DEVICE";
// export const SET_COORD = "SET_COORD";

// export const SET_MOCK_USER = "SET_MOCK_USER";
// export const SET_MOCK_WX_USER = "SET_MOCK_WX_USER";
// export const SET_MOCK_USER_PHONE = "SET_MOCK_USER_PHONE";

// // 用于网页调试 MOCK 微信的用户信息
// export const setMockUser = () => ({
//   type: SET_MOCK_USER,
//   payload: {
//     user_nickname: "郭晓明",
//     user_pwd: "",
//     user_age: 1,
//     // "openid": "oK9p06eiEk0jWNvowVjb5lGlkocM",
//     openid: "HangzhouMockb",
//     work_phone: "",
//     bank_card_type: "string",
//     user_desc:
//       "本人从事养生行业多年，首发专业，擅长中式按摩，泰式SPA，疏通经络调节亚健康。",
//     user_phone: "",
//     user_id: 23,
//     user_sex: "",
//     idnetity_card: "string",
//     headimgurl:
//       "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
//     bank_card_id: "string",
//     photo_work: `${apiUrl}/uploads/techuser4.jpg`,
//     photo_life_1: `${apiUrl}/uploads/techuser5.jpg`,
//     photo_life_3: null,
//     photo_life_2: `${apiUrl}/uploads/techuser6.jpg`,
//     work_city: "北京",
//   },
// });

// export const setMockWxUser = () => ({
//   type: SET_MOCK_WX_USER,
//   payload: mockWxUser,
// });

// export const setMockUserPhone = () => ({
//   type: SET_MOCK_USER_PHONE,
//   payload: mockUserPhone,
// });

// // 微信认证
// export const setWxcode = (code) => ({
//   type: SET_WX_CODE,
//   payload: code,
// });

// // 设备信息
// export const setDevice = (device) => ({
//   type: SET_DEVICE,
//   payload: device,
// });

// export const setAddress = (position) => ({
//   type: COMMON_USER_REQUEST,
//   payload: position,
// });

// // 坐标
// export const setCoordinate = (coord) => ({
//   type: SET_COORD,
//   payload: coord,
// });

// // 更新技师个人信息
// export const getTechUserInfo = (openid) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const techuser = await fetchTechUserInfo(openid);
//       dispatch({ type: LOAD_TECHUSER_SUCCESS, payload: techuser });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 取得经纬度，地址
// export const getLBSAddressAndSave = (lon, lat, openid) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       // 微信定位
//       // const address = await fetchLBSAddress(lon, lat);
//       // let techUserPosition = {
//       //   tech_user_id: openid,
//       //   lon: lon,
//       //   lat: lat,
//       //   work_city: getCityByWxAddress(address.data.regeocode.addressComponent),
//       //   work_position: address.data.regeocode.formatted_address,
//       //   address: address.data.regeocode.formatted_address,
//       // };
//       // 高德定位
//       const address = await getLBSAddressAmapApi(lon, lat);
//       let regeocode = address.data.regeocode;
//       let techUserPosition = {
//         tech_user_id: openid,
//         lon: lon,
//         lat: lat,
//         work_city: `${regeocode.addressComponent.city}-${regeocode.addressComponent.district}`,
//         work_position: regeocode.formatted_address,
//         address: regeocode.formatted_address,
//       };
//       console.log("高德位置信息param：", techUserPosition);
//       const res_position = await addTechUserPositionApi(techUserPosition);
//       dispatch({ type: LOAD_ADDRESS_SUCCESS, payload: res_position.data });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 详细地址
// export const getLBSAddress = (lon, lat) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       // 微信定位
//       // const address = await fetchLBSAddress(lon, lat);
//       // 高德定位
//       const address = await getLBSAddressAmapApi(lon, lat);
//       let regeocode = address.data.regeocode;
//       let techUserPosition = {
//         lon: lon,
//         lat: lat,
//         work_city: `${regeocode.addressComponent.city}-${regeocode.addressComponent.district}`,
//         work_position: regeocode.formatted_address,
//         address: regeocode.formatted_address,
//       };

//       console.log("高德位置信息param：", techUserPosition);
//       dispatch({
//         type: LOAD_ADDRESS_SUCCESS,
//         payload: techUserPosition,
//       });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // mock详细地址
// export const getMockLBSAddress = (lon, lat) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const address = await fetchLBSAddress(lon, lat);
//       console.log("address:", address.data.regeocode);
//       dispatch({
//         type: LOAD_MOCKLBSADDRESS_SUCCESS,
//         payload: address.data.regeocode,
//       });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// //路径分析： 起始地 lon1, lat1 目的地 lon2，lat2
// export const getPathAnalysis = (lon1, lat1, lon2, lat2) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const path = await fetchPathAnalysis(lon1, lat1, lon2, lat2);
//       console.log("address:", path);
//       dispatch({ type: LOAD_PATHANALYSIS_SUCCESS, payload: path.data.route });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 微信身份信息
// export const getWxUserInfo = (code) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const users = await fetchWxUserInfo(code);
//       dispatch({ type: LOAD_WXUSERINFO_SUCCESS, payload: users });
//       return users;
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 微信JSAPI
// export const getJsapiTicket = (url) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const jspApiTicket = await fetchJsapiTicket(url);
//       dispatch({ type: LOAD_JSAPITICKET_SUCCESS, payload: jspApiTicket });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 位置手动刷新
// // export const getAddressManual = (url, openid) => {
// //   return async (dispatch) => {
// //     dispatch({ type: COMMON_USER_REQUEST });
// //     try {
// //       // 微信模块jsapi注册
// //       const jspApiTicket = await fetchJsapiTicket(url);
// //       dispatch({ type: LOAD_JSAPITICKET_SUCCESS, payload: jspApiTicket });
// //       console.log(
// //         jspApiTicket.appId,
// //         jspApiTicket.timestamp,
// //         jspApiTicket.nonceStr,
// //         jspApiTicket.signature
// //       );
// //       wx.config({
// //         appId: jspApiTicket.appId,
// //         timestamp: jspApiTicket.timestamp,
// //         nonceStr: jspApiTicket.nonceStr,
// //         signature: jspApiTicket.signature,
// //         jsApiList: ["getLocation"],
// //       });
// //       wx.ready(function () {
// //         wx.getLocation({
// //           type: "wgs84",
// //           success: function (res) {
// //             console.log("location success res:", res);
// //             const latitude = res.latitude;
// //             const longitude = res.longitude;
// //             console.log(`纬度: ${latitude}, 经度: ${longitude}`);
// //             dispatch(
// //               setCoordinate({
// //                 lat: latitude,
// //                 lon: longitude,
// //               })
// //             );
// //             Toast.show({
// //               content: "位置已更新！",
// //             });
// //             console.log("位置更新：", openid != "", longitude, latitude);
// //             if (openid != "") {
// //               dispatch(getLBSAddressAndSave(longitude, latitude, openid));
// //             } else {
// //               dispatch(getLBSAddress(longitude, latitude));
// //             }
// //           },
// //           fail: function (err) {
// //             console.error(err);
// //             Toast.show({
// //               content: "获取位置失败，请手动刷新",
// //             });
// //             console.log("setmockaddress");
// //             // if (isDev) {
// //             //   dispatch(setMockAddress()); // 设置模拟地址
// //             // }
// //           },
// //         });
// //       });
// //     } catch (error) {
// //       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // 根据微信openid判断用户是否已经注册，新用户进行注册，老用户返回用户信息
// export const wechatLoginRegister = (openid, headimgurl, nickname) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const user = await wechatLogin(openid, headimgurl, nickname);
//       dispatch({ type: LOAD_WECHATLOGIN_SUCCESS, payload: user.data });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 修改用户手机号码
// export const updateUserPhone = (param) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const user = await updateUserPhoneApi(param);
//       dispatch({ type: LOAD_UPDATE_USERPHONE_SUCCESS, payload: user });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 修改用户手机号码
// export const updateTechUserInfo = (openid, param) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const user = await updateTechUserInfoApi(openid, param);
//       dispatch({ type: LOAD_UPDATE_USERPHONE_SUCCESS, payload: user });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 微信授权登录，根据微信身份认证code取得微信身份信息，根据返回的openid 继续登陆/注册
// export const wxAndUserRegHandle = (code) => {
//   return (dispatch) => {
//     dispatch(getWxUserInfo(code)).then((wxuser) => {
//       dispatch(
//         wechatLoginRegister(wxuser.openid, wxuser.headimgurl, wxuser.nickname)
//       );
//     });
//   };
// };

// // 保存技师位置
// export const addTechUserPositionHandler = (techUserPosition) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const user = await addTechUserPositionApi(techUserPosition.data);
//       dispatch({ type: LOAD_ADDRESS_SUCCESS, payload: user });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 保存技师工作时间(从今天起，保存最近三天)
// export const saveTechUserWorkTime = (worktimeBlocks) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const user = await saveTechUserWorkTimeApi(worktimeBlocks);
//       dispatch({ type: LOAD_SAVEWORKTIME_SUCCESS, payload: user });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };

// // 读取技师工作时间(日期算起，共三天)
// export const getTechUserWorkTime = (openid) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_USER_REQUEST });
//     try {
//       const user = await getTechUserWorkTimeApi(openid);
//       dispatch({ type: LOAD_GETWORKTIME_SUCCESS, payload: user });
//     } catch (error) {
//       dispatch({ type: COMMON_USER_FAILURE, payload: error.message });
//     }
//   };
// };
