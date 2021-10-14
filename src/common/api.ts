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

  getGenres: () => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {}
    };
    return loggedInAxios
      .get("/recommendation-genres", options)
      .then((i) => {
        return i.data.genres ? i.data.genres : i.data;
      });
  },

  getTheTape: (limit: number, settings: IRecommendationSettings) => {
    console.log(settings)
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
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

  search: (market: string, q: string = "", limit: number, offset: number, type: string) => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        market,
        q,
        offset,
        limit,
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

  getRandomTrack: (market: string, q: string = "") => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        market,
        q,
        offset: getRandomNumber(),
      },
    };
    return loggedInAxios
      .get(`/get_random_track`, options)
      .then(returnTracksData)
      .catch((e) => console.warn(e));
  }
};
