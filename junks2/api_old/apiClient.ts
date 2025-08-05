// // src/api/apiClient.js
// import axios from "axios";
// import { apiUrl } from "@/util/config";

// const apiClient = axios.create({
//   baseURL: apiUrl,
//   timeout: 30000,
// });

// // 请求拦截器
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// apiClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => Promise.reject(error)
// );

// export default apiClient;
