import { API_ENDPOINTS } from '@/config/backend-routes';
import apiClient from './apiClient';

export const welcomeMessage = async (userData: any) => {
  console.log(API_ENDPOINTS.WelcomeMessage);
  const response = await apiClient.post(
    API_ENDPOINTS.WelcomeMessage.BASE,
    userData
  );
  return response.data;
};
