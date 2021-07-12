import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import api from "../common/api";
import { safeLocalStorage, safeSessionStorage } from "../common/utils";
import CheckButton from "../components/check-button";
import GenresList from "../components/genres";
import { ITrack } from "../types/track";
import { IMe } from "./../types/me";
import PlayList from "./play-list";

const deserialize = (search: string) =>
  Object.fromEntries(new URLSearchParams(search));

function Home(props: any) {
  const [genre, setGenre] = useState("rock");
  const [accessToken, setAccessToken] = useState(
    deserialize(props.location.search).access_token
  );
  const [refreshToken, setRefreshToken] = useState(
    deserialize(props.location.search).refresh_token
  );
  const [me, setMe] = useState<IMe | null>();
  const [auth, setAuth] = useState(true);
  const [settings, setSettings] = useState({
    tracksCount: 10,
  });

  const [genreSeeds, setGenreSeeds] = useState(["rock"]);

  const [artistSeeds, setArtistSeeds] = useState([]);
  const [availableArtistSeeds, setAvailableArtistSeeds] = useState([]);

  const [songSeeds, setSongSeeds] = useState([]);
  const [availableSongSeeds, setAvailableSongSeeds] = useState([]);

  const [canAddMoreSeeds, setCanAddMoreSeeds] = useState(false);
  const [canRemoveSeeds, setCanRemoveSeeds] = useState(false);

  const [trackList, setTrackList] = useState<Array<ITrack>>([]);

  const [newPlayListName, setNewPlayListName] = useState(`My ${genreSeeds.join(', ')}`);
  const [playListID, setPlayListID] = useState('');

  const getDefaultPlayListName = (seeds: Array<string>) => (`My ${seeds.join(', ')}`);

  useEffect(() => {
    fetchAccountData().then((data) => {
      safeLocalStorage.setItem("accessToken", accessToken);
      safeLocalStorage.setItem("refreshToken", refreshToken);
    });
  // fetchAccountData();
    // TODO: error handling
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const seedCount = genreSeeds.length + artistSeeds.length + songSeeds.length;
    setCanAddMoreSeeds(seedCount > 4);
    setCanRemoveSeeds(seedCount < 2);
    getDefaultPlayListName([... genreSeeds, ...artistSeeds, ...songSeeds]);
  }, [genreSeeds, artistSeeds, songSeeds]);

  const errorHandler = (e: JQueryXHR) => {
    fetchRefreshToken();
  };

  const fetchAccountData = () => {
    if (!me) {
      return api
        .getMe(accessToken)
        .then(setMe)
        .catch(errorHandler)
    } else {
      return Promise.reject(Error("Can't fetchAccountData"))
    }
  };

  const fetchRefreshToken = () => {
    $.ajax({
      url: "/refresh_token",
      data: {
        refresh_token: refreshToken,
      },
    })
      .done(function (data) {
        console.info("refresh_token is done", data);
        setRefreshToken(data.refresh_token);
        setAccessToken(data.access_token);
      })
      .catch((error) => {
        setAuth(false);
      });
  };

  const onGenreUpdate = (seedName: string) => {
    const seedIndex = genreSeeds.indexOf(seedName);
    const newSeedState = [...genreSeeds];
    if (seedIndex !== -1) {
      newSeedState.splice(seedIndex, 1);
    } else {
      newSeedState.push(seedName);
    }
    setGenreSeeds(newSeedState);
  };

  const fetchPlaylist = () => {
    api.getTheTape(
      accessToken,
      me.country,
      genreSeeds,
      settings.tracksCount
    ).then(setTrackList).catch(errorHandler);
  }

  
  const createPlayList = () => {
    api.createPlayList(accessToken, me.id, {
        name: 'Test1',
        description: 'Test1 desc',
        public: false
    }).then((res) => {
      setPlayListID(res.id);
    })
  }
  
  const updatePlayList = () => {
    api.updatePlayList(accessToken, playListID, trackList.map(i => i.uri))
  }


  return !auth ? (
    <Redirect to="/public-home" />
  ) : !me ? (
    "loading"
  ) : (
    <div className="container px-0">
          {/* <div className="row">
      <div className="col-12">
        <div className="">
          Artist seed:
          <br />
          ToDO: get tracks with keywords - no genres than
        </div>
      </div> */}
          <div className="row">
            <div className="col-12 form-check">
              <GenresList
                canAddMoreSeeds={canAddMoreSeeds}
                canRemoveSeeds={canRemoveSeeds}
                accessToken={accessToken}
                genreList={genreSeeds}
                onGenreUpdate={onGenreUpdate} />
            </div>
          </div>
        {/* <div className="row">
            <div className="col-12">
              Track seed:
              <br />
              ToDO: get tracks with keywords - no genres than
            </div>
          </div> */}<div className="row mt-3">
            <div className=" text-center">
              Popular:
              <br />
              ToDO: popular scale min_popularity max_popularity
              <br />
              SWITCH: TOPS, TOPS AND MIDDLES, LEAST POPULAR, RANDOM:
            </div>
          </div><div className="row mt-3">
            <div className="col-12 text-center">
              <button onClick={() => { fetchPlaylist(); } }>
                GET THE TAPE!
              </button>
            </div>
            <div className="col-12 text-center">
              <Link
                to={{
                  pathname: "/play",
                  state: { me, accessToken, refreshToken, genre, settings },
                }}
              >
                PLAY THE TAPE!
              </Link>
            </div>
          </div>
          {trackList && trackList.length > 0 ? <div>
              <PlayList trackList={trackList} />
              <input value={newPlayListName} onChange={(e) => { setNewPlayListName(e.target.value) }} />
              <div><button onClick={() => {createPlayList()}}>createPlayList</button></div>
              <div><button onClick={() => {updatePlayList()}}>updatePlayList</button></div>
            </div> : ''}
    </div>
  );
}

export default Home;
