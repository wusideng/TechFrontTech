import { Product, Products } from "@/types/Product";
import apiClient from "./apiClient";

// 获取产品列表
export const fetchProducts = () => {
  return apiClient.get("/products/");
};

// 获取技师上架产品
export const fetchProductsByTech = async (
  tech_id: string | number
): Promise<Products> => {
  return await apiClient.get(`/techUserProduct/${tech_id}/products`);
};

// 获取产品详细
export const fetchProductDetail = async (product_id): Promise<Product> => {
  return await apiClient.get(`/products/${product_id}`);
};
