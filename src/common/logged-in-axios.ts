import axios, { AxiosInstance } from "axios";
import userApi from "./user-api";
import { safeLocalStorage } from "./utils";

const loggedInAxios: AxiosInstance = axios.create();
loggedInAxios.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  // TODO: fix status code processing on response on node
  const status = response.data.statusCode;
      if (status && status == 401) {
          safeLocalStorage.setItem('access_token', '');
          userApi.getNewTokens(safeLocalStorage.getItem('refresh_token'));
          Promise.reject(response.data?.body?.error?.message || response?.data?.error);
      }
  return response;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    safeLocalStorage.setItem('access_token', '');
    const refresh_token = safeLocalStorage.getItem('refresh_token');
    if (refresh_token) {
      safeLocalStorage.setItem('refresh_token', '');
      return userApi.getNewTokens(safeLocalStorage.getItem('refresh_token'))
        .then(tokenData => {
          if (tokenData.status > 199 && tokenData.status < 300) {
            if (tokenData.refresh_token && tokenData.access_token) {
              safeLocalStorage.setItem('refresh_token', tokenData.refresh_token);
              safeLocalStorage.setItem('access_token', tokenData.access_token);
            }
            return axios(originalRequest);
          }
        })      
    }
  }
  return Promise.reject(error);
});

export default loggedInAxios;