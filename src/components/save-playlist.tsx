import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import playlistApi from "../common/api-playlist";
import { ITrack } from "../types/track";
import EditableText from "./editable-text";

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
        <EditableText
          value={name}
          onChange={onChange}
          placeholder={'Playlist name here'}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => {
            createPlayList();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-save"
            viewBox="0 0 16 16"
          >
            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path>
          </svg>{" "}
          Save as New
        </button>

        <button
          className={`btn btn-outline-secondary ${playListID ? "" : "d-none"}`}
          type="button"
          id="button-addon2"
          onClick={() => {
            updatePlayList();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>{" "}
          Add
        </button>
      </div>
  );
}

export default SavePlaylist;
