import axios from "axios";
import { AxiosRequestConfig } from "axios";
import loggedInAxios from "@common/logged-in-axios";
import { safeLocalStorage } from "@common/utils";


export default {
  getMe: (access_token: string) => {
    const options: AxiosRequestConfig = {
      method: "get",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    return loggedInAxios
      .get("https://api.spotify.com/v1/me", options)
      .then((i) => i.data);
  },

  getNewTokens: (refresh_token: string) => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        refresh_token,
      },
    };
    return axios.get("/refresh_token", options)
      .then((i) => (i.data))
      .then((data) => {
        if (data.refresh_token && data.access_token) {
          safeLocalStorage.setItem('refresh_token', data.refresh_token);
          safeLocalStorage.setItem('access_token', data.access_token);
        }
        return data;
      }).catch((err) => {
        safeLocalStorage.setItem('refresh_token', '');
        safeLocalStorage.setItem('access_token', '');
        return err;
      });
  },
};
