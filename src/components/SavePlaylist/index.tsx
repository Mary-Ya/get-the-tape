import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import Icons from "@common/icons";
import getRandomListName from "@common/name-gen";
import playlistApi from "@api/playlist-api";
import useCashableState from "@hooks/use-cashable-state";
import { ITrack } from "@interfaces/track";
import EditableText from "@components/EditableText";
import TapeStatusText from "@components/TapeStatusText";

interface ISavePlaylistProps {
  accessToken: string;
  myId: string;
  trackList: Array<ITrack>;
  fetchTrackList: () => void
}

function SavePlaylist(props: ISavePlaylistProps) {
  const [name, setName] = useState(getRandomListName());
  const [playListID, setPlayListID] = useCashableState("", 'playListID');
  const [status, setStatus] = useCashableState(null, 'TRACK_LIST_STATUS', props.trackList?.length == 0 ? 'EMPTY' : 'NEW');

  const [notFirstRender, setNotFirstRender] = useState(false);

  useEffect(() => {
    setNotFirstRender(true);
  })

  useEffect(() => {
    if (playListID && notFirstRender) {
      setStatus('SAVED');
    };
  }, [playListID]);

  useEffect(() => {
    if (notFirstRender) {
      if (playListID) {
        setStatus('MODIFIED');
      } else {
        setStatus('NEW')
      }
    }
  }, [props.trackList]);


  // TODO: if playlist is created - update it
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        setStatus('SAVED');
        console.log(res);
      });
  };

  return (
    <div className="px-3">
      <EditableText
          textClass={'h1'}
          value={name}
          onChange={onNameChange}
          placeholder={'Playlist name here'}
      />
      {playListID ? <div className="text-black-50">ID: {playListID} <a href={`https://open.spotify.com/playlist/${playListID}`} target="_blank">
        Open on spotify <Icons.Logo width='25px' height='25px'></Icons.Logo>
      </a></div> : ''}
      <TapeStatusText status={status} />
      <div className={`input-group mb-3 px-lg-0`}>
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
          Save
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
      </div>
    </div>
  );
}

export default SavePlaylist;
