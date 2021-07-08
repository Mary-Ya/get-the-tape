import React, { useEffect, useState } from "react";
import api from "../common/api";
import { IPlayState } from "../types/play-state";
import { errorHandler } from "../common/utils";
import { ITrack } from "../types/track";

const PlayList = (props: any) => {
    const [accessToken, setAccessToken] = useState(props.accessToken);
    //const [genreList, setGenreList] = useState(props.genreList)

    useEffect(() => {
        
    }, [])

    const renderItem = (i: ITrack) => (
        <div className="row" key={`song ${i.id}`}>
            {i.name} - {i.artists[0].name}
        </div>
    )

    return <div>
        <div>{props.trackList.map(renderItem)}</div>
    </div>
};

export default PlayList;