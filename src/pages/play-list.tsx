import React, { useEffect, useState } from "react";
import api from "../common/api";
import { IPlayState } from "../types/play-state";
import { errorHandler } from "../common/utils";
import { ITrack } from "../types/track";
import Icons from "../assets/icons";

const PlayList = (props: any) => {
    const [accessToken, setAccessToken] = useState(props.accessToken);
    //const [genreList, setGenreList] = useState(props.genreList)

    useEffect(() => {
        
    }, [])

    const renderItem = (i: ITrack) => (
        <div className="row w-25" key={`song ${i.id}`}>
            <div className="col-2">
                <a className="mr-1" href={i.href} target="_blank">
                    <Icons.Logo></Icons.Logo>
                </a>
            </div>
            <div className="col">
                <span className="border">{i.name}</span>
                <br />
                <span>{i.artists[0].name}</span>
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