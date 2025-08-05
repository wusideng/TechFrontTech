// // src/actions/userActions.js
// import {
//   fetchProducts,
//   fetchProductsByTech,
//   fetchProductDetail,
// } from "@/api/productApi"; // 假设你有一个 API 模块

// export const LOAD_PRODUCT_REQUEST = "LOAD_PRODUCT_REQUEST";
// export const LOAD_PRODUCT_SUCCESS = "LOAD_PRODUCT_SUCCESS";
// export const LOAD_PRODUCT_FAILURE = "LOAD_PRODUCT_FAILURE";
// export const LOAD_TECHPRODUCT_REQUEST = "LOAD_TECHPRODUCT_REQUEST";
// export const LOAD_TECHPRODUCT_SUCCESS = "LOAD_TECHPRODUCT_SUCCESS";
// export const LOAD_TECHPRODUCT_FAILURE = "LOAD_TECHPRODUCT_FAILURE";
// export const LOAD_PRODUCTDETAIL_REQUEST = "LOAD_PRODUCTDETAIL_REQUEST";
// export const LOAD_PRODUCTDETAIL_SUCCESS = "LOAD_PRODUCTDETAIL_SUCCESS";
// export const LOAD_PRODUCTDETAIL_FAILURE = "LOAD_PRODUCTDETAIL_FAILURE";

// export const getProducts = () => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_PRODUCT_REQUEST });
//     try {
//       const products = await fetchProducts();
//       dispatch({ type: LOAD_PRODUCT_SUCCESS, payload: products });
//     } catch (error) {
//       dispatch({ type: LOAD_PRODUCT_FAILURE, payload: error.message });
//     }
//   };
// };

// export const getProductDetail = (product_id) => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_PRODUCTDETAIL_REQUEST });
//     try {
//       const product = await fetchProductDetail(product_id);
//       dispatch({ type: LOAD_PRODUCTDETAIL_SUCCESS, payload: product });
//     } catch (error) {
//       dispatch({ type: LOAD_PRODUCTDETAIL_FAILURE, payload: error.message });
//     }
//   };
// };

// export const getProductByTechid = (tech_id) => {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_TECHPRODUCT_REQUEST });
//     try {
//       const products = await fetchProductsByTech(tech_id);
//       dispatch({ type: LOAD_TECHPRODUCT_SUCCESS, payload: products });
//     } catch (error) {
//       dispatch({ type: LOAD_TECHPRODUCT_FAILURE, payload: error.message });
//     }
//   };
// };
