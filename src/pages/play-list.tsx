import React, { useEffect, useState } from "react";
import api from "../common/api";
import { IPlayState } from "../types/play-state";
import { errorHandler } from "../common/utils";
import { Artist, ITrack } from "../types/track";
import Icons from "../assets/icons";
import Player from "../components/player";

const PlayList = (props: any) => {
    const renderArtist = (artist: Artist) => (
        <a target="_blank" key={`artist_${artist.id}`}
            href={artist.external_urls.spotify} className="fs-6 me-2">
            { artist.name }
        </a>
    )

    const renderItem = (i: ITrack) => (
        <div className="row my-3 justify-content-center" key={`song ${i.id}`}>
            <div className="col-1 col-xs-2 logo-container">
                <a className="mr-1" href={i.external_urls.spotify} target="_blank">
                    <Icons.Logo></Icons.Logo>
                </a>
            </div>
            <div className="col-4">
                <a target="_blank" href={i.external_urls.spotify} className="fs-4">{i.name}</a>
                <br />
                { i.artists.map(renderArtist) }
                <i className="bi-alarm"></i>
            </div>
            <div className="col-1">
            <audio
                controls
                src={i.preview_url || i.href}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
            </div>
        </div>
    )

    return <div>
        <div>{props.trackList.map(renderItem)}</div>
    </div>
};

export default PlayList;