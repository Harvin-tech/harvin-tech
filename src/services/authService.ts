import { API_ENDPOINTS } from '@/config/backend-routes';
import apiClient from './apiClient';
import Cookies from 'js-cookie';

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

  login: async (value: LoginData) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, value);
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    Cookies.set('token', data.data.token, { expires: 7 });
    Cookies.set('role', data.data.user.role, { expires: 7 });
    return data;
  },

  logout: async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('user');
      Cookies.remove('token');
      return response.data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('user');
      Cookies.remove('token');
      Cookies.remove('role');
      throw error;
    }
  },
};
