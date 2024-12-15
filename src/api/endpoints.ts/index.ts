const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const API_ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  PRODUCTS: `${BASE_URL}/products`,
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
};
