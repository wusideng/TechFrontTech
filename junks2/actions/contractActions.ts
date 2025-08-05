// import { submitPortraitContract, submitLawContract, submitTrainingContract, submitDealerContract, fetchContractStatus } from "@/api/contractApi";

// export const CONTTRACT_COMMON_RUQUEST = "CONTTRACT_COMMON_RUQUEST";
// export const CONTTRACT_COMMON_FAILURE = "CONTTRACT_COMMON_FAILURE";
// export const SUBMIT_PROTRAIT_CONTRACT = "SUBMIT_PROTRAIT_CONTRACT";
// export const SUBMIT_LAW_CONTRACT = "SUBMIT_LAW_CONTRACT";
// export const SUBMINT_TRAINING_CONTRACT = "SUBMINT_TRAINING_CONTRACT";
// export const SUBMIT_DEALER_CONTRACT = "SUBMIT_DEALER_CONTRACT";
// export const FETCH_PROTRAIT_CONTRACT_STATUS = "FETCH_PROTRAIT_CONTRACT_STATUS";

// export const submitPortraitContractAction = (data) => async (dispatch) => {
//   dispatch({ type: CONTTRACT_COMMON_RUQUEST });
//   try {
//     const response = await submitPortraitContract(data);
//     dispatch({ type: SUBMIT_PROTRAIT_CONTRACT, payload: response });
//   } catch (error) {
//     dispatch({ type: CONTTRACT_COMMON_FAILURE, error });
//   }
// };

// export const submitLawContractAction = (data) => async (dispatch) => {
//   dispatch({ type: CONTTRACT_COMMON_RUQUEST });
//   try {
//     const response = await submitLawContract(data);
//     dispatch({ type: SUBMIT_LAW_CONTRACT, payload: response });
//   } catch (error) {
//     dispatch({ type: CONTTRACT_COMMON_FAILURE, error });
//   }
// };

// export const submitTrainingContractAction = (data) => async (dispatch) => {
//   dispatch({ type: CONTTRACT_COMMON_RUQUEST });
//   try {
//     const response = await submitTrainingContract(data);
//     dispatch({ type: SUBMINT_TRAINING_CONTRACT, payload: response });
//   } catch (error) {
//     dispatch({ type: CONTTRACT_COMMON_FAILURE, error });
//   }
// };

// export const submitDealerContractAction = (data) => async (dispatch) => {
//   dispatch({ type: CONTTRACT_COMMON_RUQUEST });
//   try {
//     const response = await submitDealerContract(data);
//     dispatch({ type: SUBMIT_DEALER_CONTRACT, payload: response });
//   } catch (error) {
//     dispatch({ type: CONTTRACT_COMMON_FAILURE, error });
//   }
// };

// export const fetchContractStatusAction = (openid, contract_type) => async (dispatch) => {
//   dispatch({ type: CONTTRACT_COMMON_RUQUEST });
//   try {
//     const response = await fetchContractStatus(openid, contract_type);
//     dispatch({ type: FETCH_PROTRAIT_CONTRACT_STATUS, payload: response });
//   } catch (error) {
//     dispatch({ type: CONTTRACT_COMMON_FAILURE, error });
//   }
// };
