import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { IPlayListInitData } from "../types/play-list";
import { IRecommendationSettings } from "../types/recommendation-settings";
import { getRandomNumber, safeSessionStorage } from "./utils";
const returnTracksData = (i: any) => i.data.body.tracks;
const returnBody = (i: any) => i.data.body;

const playList = {
  create: (access_token: string, userId: string, playlistData: IPlayListInitData) => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        access_token,
        data: playlistData,
        userId
      },
    };
    return axios
      .get(`/create-play-list`, options)
      .then(returnBody)
      .catch((e) => console.warn(e));
  },

  update: (access_token: string, playlist_id: string, urisList: Array<string>) => {
    const options: AxiosRequestConfig = {
      method: "get",
      params: {
        playlist_id,
        urisList,
        access_token
      },
    };
    return axios
      .get(`/update-play-list`, options)
      .then(returnBody)
      .catch((e) => console.warn(e));
  },
}

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
    return axios
      .get(`/get-the-tape`, options)
      .then((res) => {
        safeSessionStorage.setItem('currentTrackList', res);
        safeSessionStorage.setItem('currentSettings', settings);
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
  
  savePlayListAsNew: (access_token: string, userId: string, playlistData: IPlayListInitData, trackUrisList: Array<string>) => {
    return playList.create(access_token, userId, playlistData)
      .then(res => {
        return playList.update(access_token, res.id, trackUrisList);
      });
  }
};
