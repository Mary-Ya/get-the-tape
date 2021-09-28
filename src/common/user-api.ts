import axios from "axios";
import { AxiosRequestConfig } from "axios";


export default {
  getMe: (access_token: string) => {
    const options: AxiosRequestConfig = {
      method: "get",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    return axios
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
    return axios.get("/refresh_token", options).then((i) => i.data);
  },
};
