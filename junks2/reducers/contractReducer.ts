// import {
//   CONTTRACT_COMMON_RUQUEST,
//   CONTTRACT_COMMON_FAILURE,
//   SUBMIT_PROTRAIT_CONTRACT,
//   SUBMIT_LAW_CONTRACT,
//   SUBMINT_TRAINING_CONTRACT,
//   SUBMIT_DEALER_CONTRACT,
//   FETCH_PROTRAIT_CONTRACT_STATUS,
// } from "@/actions/contractActions";

// const initialState = {
//   loading: false,
//   error: null,
//   status: "pending",
//   contractFile: null,
// };

// const contractReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CONTTRACT_COMMON_RUQUEST:
//       return { ...state, loading: true, error: null };
//     case CONTTRACT_COMMON_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     case SUBMIT_PROTRAIT_CONTRACT:
//       return {
//         ...state,
//         status: "apply",
//         contractFile: action.payload,
//         loading: false,
//         error: null,
//       };
//     case SUBMIT_LAW_CONTRACT:
//       return {
//         ...state,
//         status: "apply",
//         contractFile: action.payload,
//         loading: false,
//         error: null,
//       };
//     case SUBMINT_TRAINING_CONTRACT:
//       // return { ...state, status: "pending", contractFile: action.payload, loading: false, error: null };
//       return {
//         ...state,
//         status: "apply",
//         contractFile: action.payload,
//         loading: false,
//         error: null,
//       };
//     case SUBMIT_DEALER_CONTRACT:
//       return {
//         ...state,
//         status: "apply",
//         contractFile: action.payload,
//         loading: false,
//         error: null,
//       };
//     case FETCH_PROTRAIT_CONTRACT_STATUS:
//       if (typeof action.payload === "string")
//         return {
//           ...state,
//           status: action.payload,
//           loading: false,
//           error: null,
//         };
//       return {
//         ...state,
//         status: action.payload.status,
//         contractFile: action.payload,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export default contractReducer;
