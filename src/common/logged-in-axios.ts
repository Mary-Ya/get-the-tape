import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { values } from "lodash";
import userApi from "./user-api";
import { safeLocalStorage } from "./utils";

const isSuccessCode = (code: number) => (code && code > 199 && code < 300);

const refreshAccessTokenAndTryAgain = (data: AxiosResponse<any>) => {
  const originalRequest = data.config as AxiosRequestConfig & { _retry: boolean };
  if (!originalRequest._retry) {
  originalRequest._retry = true;
  safeLocalStorage.setItem('access_token', '');
  const refresh_token = safeLocalStorage.getItem('refresh_token');
  if (refresh_token) {
    return userApi.getNewTokens(refresh_token)
      .then(tokenData => {
        if (isSuccessCode(tokenData.status)) {
          return axios(originalRequest);
        }
        return data;
      })
      .catch((error) => {
        window.location.reload();

        Promise.reject(error);
      }) 
    }
  };
  return data;
}

const loggedInAxios: AxiosInstance = axios.create();
loggedInAxios.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const access_token = safeLocalStorage.getItem('access_token');
  if (access_token && newConfig.params) {
    newConfig.params.access_token = access_token;
  }
  return newConfig;
})

loggedInAxios.interceptors.response.use((response) => {
  
  // As app api call external api response code may be 2xx
  // but the response from external api inside will be 4xx
  // shouldn't appear anymore but 
  // TODO: nest if still need it
  const status = response.data.statusCode;
  if (status && !isSuccessCode(status)) {
    if (status === 401) {
      return refreshAccessTokenAndTryAgain(response);
    }
    Promise.reject(response.data?.body?.error?.message || response?.data?.error);
  }
  return response;
}, (error) => {
  if (error.response.status === 401) {
    return refreshAccessTokenAndTryAgain(error);
  }
  return Promise.reject(error);
});

export default loggedInAxios;