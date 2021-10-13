import {
  AxiosRequestConfig
} from "axios";
import {
  IPlaylistInitData
} from "../types/playlist";
import loggedInAxios from "./logged-in-axios";
import {
  returnBody
} from "./utils";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

const create = (userId: string, playlistData: IPlaylistInitData) => {
  const options: AxiosRequestConfig = {
    method: "get",
    params: {
      data: playlistData,
      userId
    },
  };
  return loggedInAxios
    .get(`/create-playlist`, options)
    .then(returnBody)
    .catch((e) => console.warn(e));
};

const update = (playlist_id: string, urisList: Array < string > ) => {
  const options: AxiosRequestConfig = {
    method: "get",
    params: {
      playlist_id,
      urisList
    },
  };
  return loggedInAxios
    .get(`/update-playlist`, options)
    .then((res) => (Object.assign(returnBody(res), {
      playlist_id
    })))
    .catch((e) => console.warn(e));
};

const savePlaylistAsNew = (userId: string, playlistData: IPlaylistInitData, trackUrisList: Array < string > ) => {
  return create(userId, playlistData)
    .then(res => {
      return update(res.id, trackUrisList);
    });
};

const getList = (offset = DEFAULT_OFFSET, limit = DEFAULT_LIMIT) => {
  const options: AxiosRequestConfig = {
    method: "get",
    params: {
      limit,
      offset
    },
  };
  return loggedInAxios
    .get(`/get-playlist-list`, options)
    .then(returnBody)
    .catch((e) => console.warn(e));
};

const unfollow = (playlist_id: string) => {
  const options: AxiosRequestConfig = {
    method: "get",
    params: {
      playlist_id
    },
  };
  return loggedInAxios
    .get(`/unfollow-playlist`, options)
    .then((res) => (res.data))
    .catch((e) => console.warn(e));
};

export default {
  create,
  update,
  savePlaylistAsNew,
  getList,
  unfollow
}