import { API_ENDPOINTS } from "../endpoints.ts";
import apiClient from "./apiClient";

export const fetchProducts = async () => {
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS);
  return response.data;
};
