// import {
//   BILL_COMMON_RUQUEST,
//   BILL_COMMON_FAILURE,
//   LOAD_CREATEBILL_SUCCESS,
//   LOAD_BILLTECHSUM_SUCCESS,
// } from "@/actions/billAction";

// const initialState = {
//   bills: [],
//   bill: {},
//   sum: {},
// };

// const billReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BILL_COMMON_RUQUEST:
//       return { ...state, loading: true, error: null };
//     case BILL_COMMON_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     case LOAD_CREATEBILL_SUCCESS:
//       return { ...state, loading: true, bill: action.payload };
//     case LOAD_BILLTECHSUM_SUCCESS:
//       return { ...state, loading: true, sum: action.payload };
//     default:
//       return state;
//   }
// };

// export default billReducer;
