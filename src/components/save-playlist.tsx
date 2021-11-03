import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import Icons from "../assets/icons";
import getRandomListName from "../common/name-gen";
import playlistApi from "../common/playlist-api";
import useCashableState from "../hooks/use-cashable-state";
import { ITrack } from "../types/track";
import EditableText from "./editable-text";

interface ISavePlaylistProps {
  accessToken: string;
  myId: string;
  trackList: Array<ITrack>;
  fetchTrackList: () => void
}

const TRACKLIST_STATUS_LIST = {
  "NEW": "NEW",
  "SAVED": "SAVED",
  "MODIFIED": "MODIFIED"
}

const TRACKLIST_STATUS_TEXT_LIST = {
  "NEW": () => (() => (<></>)),
  "SAVED": () => ((id) => (<span className="text-black-50">Added to the playlist  
    <span className="text-decoration-none mx-2 py-2">{id} </span>
      <a href={`https://open.spotify.com/playlist/${id}`} target="_blank">
      Open on spotify <Icons.Logo width='25px' height='25px'></Icons.Logo>
    </a>
  </span>)),
  "MODIFIED": () => ((id) => (<span className="text-black-50">Changes will be saved to the playlist 
    <span className="text-decoration-none mx-2 py-2">{id} </span>
      <a href={`https://open.spotify.com/playlist/${id}`} target="_blank">
      Open on spotify <Icons.Logo width='25px' height='25px'></Icons.Logo>
    </a>
  </span>)),
}

function StatusText(props: {status: string, playListID: null | string}) {
  return TRACKLIST_STATUS_TEXT_LIST[props.status]()(props.playListID);
};

function SavePlaylist(props: ISavePlaylistProps) {
  const [isChangedManually, setIsChangedManually] = useState(false);
  const [name, setName] = useState(getRandomListName());
  const [playListID, setPlayListID] = useCashableState("", 'playListID');
  const [status, setStatus] = useCashableState(TRACKLIST_STATUS_LIST['NEW'], 'TRACKLIST_STATUS_LIST');

  useEffect(() => {
    setStatus(TRACKLIST_STATUS_LIST['SAVED']);
  }, [playListID]);

  useEffect(() => {
    setStatus(TRACKLIST_STATUS_LIST['MODIFIED']);
  }, [props.trackList]);


  // TODO: if playlist is created - update it
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChangedManually(true);
    setName(e.target.value);
  };

  const createPlayList = () => {
    playlistApi
      .savePlaylistAsNew(
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
        playListID,
        props.trackList.map((i) => i.uri)
      )
      .then((res) => {
        setStatus(TRACKLIST_STATUS_LIST['SAVED']);
        console.log(res);
      });
  };

  return (
    <div>
      <div className={`input-group mb-3 px-lg-0 px-3`}>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            props.fetchTrackList();
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
          className={`btn btn-outline-secondary ${props.trackList.length > 0 ? "" : "d-none"}`}
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
      <StatusText playListID={playListID} status={status}/>
    </div>
  );
}

export default SavePlaylist;
