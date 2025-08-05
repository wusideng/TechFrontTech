// /**
//  * 收益计算
//  * 技师收益，工资发放，工资统计
//  */

// import { createBillApi, getBillByTechSumApi } from "@/api/billApi";

// export const BILL_COMMON_RUQUEST = "BILL_COMMON_RUQUEST";
// export const BILL_COMMON_FAILURE = "BILL_COMMON_FAILURE";

// export const LOAD_CREATEBILL_SUCCESS = "LOAD_CREATEBILL_SUCCESS";
// export const LOAD_BILLTECHSUM_SUCCESS = "LOAD_BILLTECHSUM_SUCCESS";

// // 创建技师收益信息
// export const createBill = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: BILL_COMMON_RUQUEST });
//     try {
//       const response = await createBillApi(data);
//       dispatch({ type: LOAD_CREATEBILL_SUCCESS, payload: response });
//     } catch (error) {
//       dispatch({ type: BILL_COMMON_FAILURE, error });
//     }
//   };
// };

// // 技师收益信息统计，用于技师端我的钱包
// export const getBillByTechSum = (openid) => {
//   return async (dispatch) => {
//     dispatch({ type: BILL_COMMON_RUQUEST });
//     try {
//       const response = await getBillByTechSumApi(openid);
//       dispatch({ type: LOAD_BILLTECHSUM_SUCCESS, payload: response });
//     } catch (error) {
//       dispatch({ type: BILL_COMMON_FAILURE, error });
//     }
//   };
// };

// // 技师收益信息统计，用于技师端我的钱包，详细
