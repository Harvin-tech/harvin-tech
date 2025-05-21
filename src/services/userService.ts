import { API_ENDPOINTS } from '@/config/backend-routes';
import { nextApiClient } from './apiClient';

export const fetchUsers = async () => {
  const response = await nextApiClient.get(
    `${API_ENDPOINTS.USERS}?page=1&limit=100`
  );
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await nextApiClient.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data;
};
