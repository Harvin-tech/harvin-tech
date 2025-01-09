import { API_ENDPOINTS } from '@/config/backend-routes';
import apiClient from './apiClient';

export const fetchUsers = async () => {
  const response = await apiClient.get(API_ENDPOINTS.USERS);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};
