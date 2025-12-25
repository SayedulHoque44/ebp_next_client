"use client";
import AuthApi from "@/features/auth/api/auth.api";
import useAuthStore from "@/features/auth/store/useAuthStore";
import { errorToast } from "@/utils/toast";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// interface FailedRequests {
//   resolve: (value: AxiosResponse) => void;
//   reject: (value: AxiosError) => void;
//   config: AxiosRequestConfig;
//   error: AxiosError;
// }
// let failedRequests: FailedRequests[] = [];
// let isTokenRefreshing = false;

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // console.log(error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      //EBP system is direct logout the user if the token is expired or invalid
      //   await useAuthStore.getState().clearAccessToken();
      //   window.location.href = "/login";

      // if (isTokenRefreshing) {
      //   return new Promise((resolve, reject) => {
      //     failedRequests.push({
      //       resolve,
      //       reject,
      //       config: error.config as InternalAxiosRequestConfig,
      //       error,
      //     });
      //   });
      // }

      // isTokenRefreshing = true;
      // try {
      //   const accessToken = await AuthApi.refreshTokenHandler();
      //   if (!accessToken) throw new Error("Failed to refresh access token");

      //   useAuthStore.getState().setAccessToken(accessToken);

      //   // Retry failed requests with new access token
      //   failedRequests.forEach(({ resolve, reject, config }) => {
      //     api({
      //       ...config,
      //       headers: {
      //         ...config.headers,
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     })
      //       .then(resolve)
      //       .catch(reject);
      //   });

      //   failedRequests = [];
      // } catch (error) {
      //   failedRequests.forEach(({ reject, error }) => reject(error));
      errorToast({ msg: "Session expired, please login again" });
      useAuthStore.getState().clearAccessToken();
      useAuthStore.getState().clearUser();
      window.location.href = "/login";
      //   console.error("Failed to refresh token", error);
      // } finally {
      //   isTokenRefreshing = false;
      // }
    }
    return Promise.reject(error);
  }
);
export const commonThenResult = (res: AxiosResponse) => res?.data?.data;
export default api;
