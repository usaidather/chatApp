import axios from 'axios';
import Config from 'react-native-config';

const baseURL = Config.API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(request => {
  if (__DEV__) {
    console.log('[API Request]', {
      method: request.method?.toUpperCase(),
      url: request.url,
      params: request.params,
      data: request.data,
    });
  }

  return request;
});

apiClient.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.log('[API Response]', {
        status: response.status,
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  error => {
    if (__DEV__) {
      console.error('[API Error]', {
        message: error.message,
        status: error.response?.status,
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  },
);
