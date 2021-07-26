import React, { useEffect, useState } from "react";
import api from "../common/api";
import { IPlayState } from "../types/play-state";
import { errorHandler } from "../common/utils";
import { Artist, ITrack } from "../types/track";
import Icons from "../assets/icons";
import Player from "../components/player";
import Track from "../components/track";

const PlayList = (props: any) => {
    const renderArtist = (artist: Artist) => (
        <a target="_blank" key={`artist_${artist.id}`}
            href={artist.external_urls.spotify} className="fs-6 me-2">
            { artist.name }
        </a>
    )

    
    const playIsDisabled = () => { return !this.props.track.preview_url || this.props.isPlaying };
    const pauseIsDisabled = () => { return !this.props.track.preview_url && !this.props.isPlaying };
  

    const renderItem = (i: ITrack) => (
        <Track controls={true}
            track={i}
            key={"playlist-item" + i.id}
            className="button_"
            onClick={null}
            
        ></Track>
    )

    return <div>
        <div>{props.trackList.map(renderItem)}</div>
    </div>
};

export default PlayList;