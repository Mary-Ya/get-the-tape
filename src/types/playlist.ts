import { IAnyList } from "./common";
import { ITrack } from "./track";

export interface IPlaylist {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images:        any[];
    name:          string;
    owner:         Owner;
    primary_color: null;
    public:        boolean;
    snapshot_id:   string;
    tracks:        Tracks;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href:  null;
    total: number;
}

export interface Owner {
    display_name:  string;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    type:          string;
    uri:           string;
}

export interface IPlaylistInitData {
    name: string,
    description: string,
    public: boolean
}

export interface ITracks extends IAnyList {
    items:    ITrack[];
}

export interface IPlaylistList extends IAnyList {
    items: IPlaylist[];
}
