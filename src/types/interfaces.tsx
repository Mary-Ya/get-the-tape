import { IMe } from "../types/me";
import { ITrack } from "../types/track";

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
    resultsTable: Array<any>
}
  
export type { IPlayState }