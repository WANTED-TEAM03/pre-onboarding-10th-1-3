import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '@/utils/config';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(req => {
  const token = localStorage.getItem('access_token');
  if (token) {
    req.headers.authorization = `Bearer ${JSON.parse(token)}`;
  }
  return req;
});

export default apiClient;
