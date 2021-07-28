import axios, { AxiosRequestConfig } from "axios";
import { IPlayListInitData } from "../types/play-list";
import { returnBody } from "./utils";

const create = (access_token: string, userId: string, playlistData: IPlayListInitData) => {
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
};

const update = (access_token: string, playlist_id: string, urisList: Array<string>) => {
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
        .then((res) => (Object.assign(returnBody(res), {playlist_id})))
        .catch((e) => console.warn(e));
};

const savePlayListAsNew = (access_token: string, userId: string, playlistData: IPlayListInitData, trackUrisList: Array<string>) => {
    return create(access_token, userId, playlistData)
        .then(res => {
            return update(access_token, res.id, trackUrisList);
        });
};
  
export default {
    create, update, savePlayListAsNew
}