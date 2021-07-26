import { IMe } from "./me";
import { ITrack } from "./track";

interface IPlayState {
    me: IMe;
    modalActive: Boolean;
    searchInUrl: string;
    accessToken: string;
    refreshToken: string;
    genre: string;
    settings: any;
    thisTrack: ITrack;
    iWin: false;
    gamesLeft: number;
    resultsTable: Array<any>,
    tracks: Array<ITrack>
}
  
export type { IPlayState }