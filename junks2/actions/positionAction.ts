// import { getTechUserHistoryLocalApi } from "@/api/userApi";
// import { fetchPois } from "@/api/userApi";

// export const COMMON_POSITION_REQUEST = "COMMON_POSITION_REQUEST";
// export const COMMON_POSITION_FAILURE = "COMMON_POSITION_FAILURE";
// export const LOAD_HISTORYLOCAL_SUCCESS = "LOAD_HISTORYLOCAL_SUCCESS";
// export const LOAD_LBSADDRESSPOI_SUCCESS = "LOAD_LBSADDRESSPOI_SUCCESS";

// // （高德）搜索附近poi
// export const getPois = (keyword, lon, lat, city) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_POSITION_REQUEST });
//     try {
//       const res = await fetchPois(keyword, lon, lat, city);
//       console.log("（高德）搜索附近poi :", res);
//       dispatch({ type: LOAD_LBSADDRESSPOI_SUCCESS, payload: res.data.pois });
//     } catch (error) {
//       dispatch({ type: COMMON_POSITION_FAILURE, payload: error.message });
//     }
//   };
// };

// // 微信身份信息
// export const getTechUserHistoryLocal = (openid, pageNum, pageSize) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_POSITION_REQUEST });
//     try {
//       const res = await getTechUserHistoryLocalApi(openid, pageNum, pageSize);
//       dispatch({ type: LOAD_HISTORYLOCAL_SUCCESS, payload: res.data });
//     } catch (error) {
//       dispatch({ type: COMMON_POSITION_FAILURE, payload: error.message });
//     }
//   };
// };
