import axios, { isAxiosError } from 'axios';

const baseURL =
  import.meta.env.VITE_API_BASE_URL ??
  (window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api');

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        'Request failed';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error instanceof Error ? error : new Error('Request failed'));
  },
);

export default apiClient;
