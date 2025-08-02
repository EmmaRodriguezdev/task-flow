 
import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosRequestConfig,
  } from 'axios';
  import { getSessionSafe } from '@/core/session-manager';
  import { Constants } from '@/core/constants';
  import { redirect } from 'next/navigation';
  
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: Constants.API_URL,
    timeout: 50000,
    headers: { 'Content-Type': 'application/json' },
  });
  
  // Interceptor para solicitudes
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const session = await getSessionSafe();
        if (session) {
          const token = session.access_token;
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.log(error);
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
  
  // Interceptor para respuestas
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        if (error.response.statusText === 'Unauthorized') {
          redirect('/login');
        }
      }
      return Promise.reject(error);
    },
  );
  
  export const http = {
    get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
      axiosInstance
        .get<T>(url, config)
        .then((res: AxiosResponse<T>) => res.data)
        .catch((error: AxiosError) => {
          return Promise.reject(error.response?.data ?? error);
        }),
  
    post: <T = unknown, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      axiosInstance
        .post<T>(url, data, config)
        .then((res: AxiosResponse<T>) => res.data)
        .catch((error: AxiosError) => Promise.reject(error)),
  
    put: <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> =>
      axiosInstance
        .put<T>(url, data, config)
        .then((res: AxiosResponse<T>) => res.data)
        .catch((error: AxiosError) => {
          return Promise.reject(error.response?.data ?? error);
        }),
  
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
      axiosInstance
        .delete<T>(url, config)
        .then((res: AxiosResponse<T>) => res.data)
        .catch((error: AxiosError) => {
          return Promise.reject(error.response?.data ?? error);
        }),
  
    patch: <T = unknown, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      axiosInstance
        .patch<T>(url, data, config)
        .then((res: AxiosResponse<T>) => res.data)
        .catch((error: AxiosError) => {
          return Promise.reject(error.response?.data ?? error);
        }),
  };
  export default http;