import React, { useEffect, useState } from "react";
import api from "../common/api";
import { IPlayState } from "../types/play-state";
import { errorHandler } from "../common/utils";
import { Artist, ITrack } from "../types/track";
import Icons from "../assets/icons";

const PlayList = (props: any) => {
    const [accessToken, setAccessToken] = useState(props.accessToken);
    //const [genreList, setGenreList] = useState(props.genreList)

    useEffect(() => {
        
    }, [])

    const renderArtist = (artist: Artist) => (
        <a target="_blank" key={`artist_${artist.id}`}
            href={artist.external_urls.spotify} className="fs-6 me-2">
            {artist.name}
        </a>
    ) 

    const renderItem = (i: ITrack) => (
        <div className="row my-3" key={`song ${i.id}`}>
            <div className="col-1 col-xs-2 logo-container">
                <a className="mr-1" href={i.external_urls.spotify} target="_blank">
                    <Icons.Logo></Icons.Logo>
                </a>
            </div>
            <div className="col">
                <a target="_blank" href={i.external_urls.spotify} className="fs-4">{i.name}</a>
                <br />
                { i.artists.map(renderArtist) }
                <i className="bi-alarm"></i>
            </div>
            <div className="col-2">
                <Icons.Play></Icons.Play>
                <Icons.Pause></Icons.Pause>
            </div>
        </div>
    )

    return <div>
        <div>{props.trackList.map(renderItem)}</div>
    </div>
};

export default PlayList;