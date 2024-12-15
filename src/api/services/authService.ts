import { API_ENDPOINTS } from "../endpoints.ts";
import apiClient from "./apiClient";

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  mobile?: number;
  photo?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  signup: async (data: SignupData) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },
  
  login: async (data: LoginData) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  logout: async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  }
};
