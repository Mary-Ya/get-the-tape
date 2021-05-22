import axios from 'axios';
import {AxiosRequestConfig} from 'axios';
import utils from './utils';
const returnTracksData = (i: any) => (i.data.body.tracks);
export default {
    getMe: (access_token: string) => {
        const options: AxiosRequestConfig = {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + access_token
              }
          };
        return axios.get('https://api.spotify.com/v1/me', options).then(i => i.data);
    },

    getRandomTrack: (market: string,  accessToken:string, q:string = '') => {
        const options: AxiosRequestConfig = {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                market,
                q,
                offset: utils.getRandomNumber(),
                access_token: accessToken,
            }
        };
        return axios.get(`/get_random_track`, options).then(returnTracksData).catch(e => console.warn(e));
    },
   
}