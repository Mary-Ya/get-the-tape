import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { getRandomNumber } from "./utils";
const returnTracksData = (i: any) => i.data.body.tracks;
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

  getGenres: (access_token: string) => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        access_token: access_token,
      },
    };
    return axios
      .get("/recommendation-genres", options)
      .then((i) => {
        console.log(i.data);
        return i.data.genres ? i.data.genres : i.data;
      });
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

  getTheTape: (accessToken: string, market: string, genre: string, limit: number) => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        market, genre, limit,
        access_token: accessToken,
      },
    };
    return axios
      .get(`/get-the-tape`, options)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.warn(e));
  },

  getRandomTrack: (market: string, accessToken: string, q: string = "") => {
    const options: AxiosRequestConfig = {
      method: "get",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        market,
        q,
        offset: getRandomNumber(),
        access_token: accessToken,
      },
    };
    return axios
      .get(`/get_random_track`, options)
      .then(returnTracksData)
      .catch((e) => console.warn(e));
  },
};
