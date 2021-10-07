import { AxiosRequestConfig } from "axios";
import { IRecommendationSettings } from "../types/recommendation-settings";
import loggedInAxios from "./logged-in-axios";
import { getRandomNumber, safeSessionStorage } from "./utils";

const returnTracksData = (i: any) => i.data.body.tracks;

export default {
  // for test purposes
  reject: () => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        error: {
          code: 401,
          message: 'rejected with 401'
        }
      },
    };
    return loggedInAxios
      .get("/reject", options)
      .then((i) => {
        return console.log(i);
      });
  },
  getGenres: (access_token: string) => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        access_token: access_token,
      },
    };
    return loggedInAxios
      .get("/recommendation-genres", options)
      .then((i) => {
        return i.data.genres ? i.data.genres : i.data;
      });
  },

  getTheTape: (access_token: string, limit: number, settings: IRecommendationSettings) => {
    console.log(settings)
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        access_token,
        limit,
        settings
      },
    };
    return loggedInAxios
      .get(`/get-the-tape`, options)
      .then((res) => {
        safeSessionStorage.setItem('currentTrackList', res);
        safeSessionStorage.setItem('currentSettings', settings);
        return res.data;
      })
      .catch((e) => console.warn(e));
  },

  search: (market: string, access_token: string, q: string = "", limit: number, offset: number, type: string) => {
    const options: AxiosRequestConfig = {
      method: "get",
      headers: {
        Authorization: "Bearer " + access_token,
      },
      params: {
        market,
        q,
        offset,
        limit,
        access_token,
        type
      },
    };
    return loggedInAxios
      .get(`/search`, options)
      .then(res => {
        console.log('search', res)
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
    return loggedInAxios
      .get(`/get_random_track`, options)
      .then(returnTracksData)
      .catch((e) => console.warn(e));
  }
};
