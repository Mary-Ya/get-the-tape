import React, { useEffect, useState } from "react";
import api from "../common/api";
import { IPlayState } from "../types/interfaces";
import { errorHandler } from "../common/utils";
import { ITrack } from "../types/track";

const PlayList = (props: any) => {
    const [me, setMe] = useState(props.me);
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
        {props.trackList.map(renderItem)}
    </div>
};

export default PlayList;