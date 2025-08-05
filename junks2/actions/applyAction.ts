// /**
//  * 申请上线（上线管理）
//  * Method
//  * 上线申请
//  * 基本信息修改
//  * 生活照上传
//  * 工作照上传
//  * 从业资格证上传
//  */

// import { getApplyStatusApi } from "@/api/applyApi";

// export const COMMON_APPLY_REQUEST = "COMMON_APPLY_REQUEST";
// export const COMMON_APPLY_FAILURE = "COMMON_APPLY_FAILURE";
// export const LOAD_APPLY_STATUSES_SUCCESS = "LOAD_APPLY_STATUSES_SUCCESS";

// import {} from "@/api/applyApi";

// // 微信身份信息
// export const getApplyStatus = (openid) => {
//   return async (dispatch) => {
//     dispatch({ type: COMMON_APPLY_REQUEST });
//     try {
//       const res = await getApplyStatusApi(openid);
//       dispatch({ type: LOAD_APPLY_STATUSES_SUCCESS, payload: res });
//     } catch (error) {
//       dispatch({ type: COMMON_APPLY_FAILURE, payload: error.message });
//     }
//   };
// };
