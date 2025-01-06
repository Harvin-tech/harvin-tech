import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  withCredentials: true, // This ensures cookies are included in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
