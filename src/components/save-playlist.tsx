import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import playlistApi from '../common/api-playlist';
import { ITrack } from "../types/track";

interface ISavePlaylistProps {
  name: string;
  accessToken: string;
  myId: string;
  trackList: Array<ITrack>;
}

function SavePlaylist(props: ISavePlaylistProps) {
  const [isChangedManually, setIsChangedManually] = useState(false);
  const [name, setName] = useState(props.name);
  const [playListID, setPlayListID] = useState("");

  useEffect(() => {
    if (!isChangedManually) {
      setName(props.name);
    }
  }, [props.name]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChangedManually(true);
    setName(e.target.value);
  };

  const createPlayList = () => {
    playlistApi
      .savePlayListAsNew(
        props.accessToken,
        props.myId,
        {
          name,
          description: "Test1 desc",
          public: false,
        },
        props.trackList.map((i) => i.uri)
      )
        .then((res) => {
            console.log(res);
        setPlayListID(res.playlist_id);
      });
    };
    
    const updatePlayList = () => {
        playlistApi.update(props.accessToken, playListID, props.trackList.map((i) => i.uri))
            .then((res) => {
                console.log(res);
            });
    };

  return (
    <div>
      <input value={name} onChange={onChange} />
      <div>
        <button
          onClick={() => {
            createPlayList();
          }}
        >
          Save as new
        </button>
        <button className={playListID ? '' : 'd-none'}
          onClick={() => {
            updatePlayList();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default SavePlaylist;
