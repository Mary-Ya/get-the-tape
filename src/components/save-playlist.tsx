import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import Icons from "../assets/icons";
import playlistApi from "../common/api-playlist";
import useCashableState from "../hooks/use-cashable-state";
import { ITrack } from "../types/track";
import EditableText from "./editable-text";

interface ISavePlaylistProps {
  name: string;
  accessToken: string;
  myId: string;
  trackList: Array<ITrack>;
  fetchPlaylist: () => void
}

function SavePlaylist(props: ISavePlaylistProps) {
  const [isChangedManually, setIsChangedManually] = useState(false);
  const [name, setName] = useState(props.name);
  const [playListID, setPlayListID] = useCashableState("", 'playListID');

  useEffect(() => {
    if (!isChangedManually) {
      setName(props.name);
    }
  }, [props.name]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChangedManually(true);
    setName(e.target.value);
  };

  const createPlayList = () => {
    playlistApi
      .savePlaylistAsNew(
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
    playlistApi
      .update(
        props.accessToken,
        playListID,
        props.trackList.map((i) => i.uri)
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <div className={`input-group mb-3 px-lg-0 px-3`}>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            props.fetchPlaylist();
          }}
        >
          GET THE TAPE!
        </button>
        
        <button
          className={`btn btn-outline-secondary ${playListID ? "" : "d-none"}`}
          type="button"
          id="button-addon2"
          onClick={() => {
            updatePlayList();
          }}
        >
          <Icons.Plus />
          Add
        </button>
        
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => {
            createPlayList();
          }}
        >
          <Icons.Inside />
          Save as New
        </button>
        <EditableText
          textClass={'ms-3 py-2'}
          value={name}
          onChange={onNameChange}
          placeholder={'Playlist name here'}
        />
      </div>
      {playListID
        ? <span className="text-black-50">This playlist ID is 
            <span className="text-decoration-none mx-2 py-2">{playListID} </span>
              <a href={`https://open.spotify.com/playlist/${playListID}`} target="_blank">
              Open on spotify <Icons.Logo width='25px' height='25px'></Icons.Logo>
            </a>
          </span>
        : ''}
    </div>
  );
}

export default React.memo(SavePlaylist);
