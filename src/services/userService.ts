import { API_ENDPOINTS } from '@/config/backend-routes';
import { nextApiClient } from './apiClient';

export const fetchUsers = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const response = await nextApiClient.get(
    `/api/private/users?${queryParams.toString()}`
  );
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await nextApiClient.post('/api/auth/login', credentials);
  return response.data;
};
