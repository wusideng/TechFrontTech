// import apiClient from "./apiClient";

// // 获取产品列表
// export const fetchProducts = () => {
//   return apiClient.get("/products/");
// };

// // 获取技师上架产品
// export const fetchProductsByTech = (tech_id) => {
//   return apiClient.get(`/techUserProduct/${tech_id}/products`);
// };

// // 获取产品详细
// export const fetchProductDetail = (product_id) => {
//   return apiClient.get(`/products/${product_id}`);
// };

// // 绑定技师手机号码
// // req
// // {
// //   user_id: 'oK9p06eiEk0jWNvowVjb5lGlkocM',
// //   user_phone: '13300001115'
// // }
// export const updateUserPhoneApi = (param) => {
//   return apiClient.post(
//     `/techUser/update_phone/?user_id=${param.user_id}&user_phone=${param.user_phone}`,
//     param
//   );
// };
