import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

import api from "../common/api";
import userApi from "../common/user-api";
import { divideArray, safeLocalStorage, cleanObject } from "../common/utils";
import { IArtist, ITrack } from "../types/track";
import { IMe } from "./../types/me";
import PlayList from "../components/track-list";

import SavePlaylist from "../components/save-playlist";
import SeedSettings from '../components/home/seed-settings';
import OptionalSettings from '../components/home/optional-settings';

import Spinner from "../components/spinner";

import useSearchSettings from "../hooks/use-search-settings";

function Home(props: any) {
  const [accessToken, setAccessToken] = useState(props.access_token);
  const [refreshToken, setRefreshToken] = useState(props.refresh_token);
  const [me, setMe] = useState<IMe | null>();
  const [auth, setAuth] = useState(true);
  const [tracksCount, setTrackCount] = useState(10);

  const [optionalSettings, setOptionalSettings] = useSearchSettings({
    min_tempo: undefined,
    max_tempo: undefined,
    target_tempo: undefined,
    
    min_instrumentalness: undefined,
    max_instrumentalness: undefined,
    target_instrumentalness: undefined,
    
    min_popularity: undefined,
    max_popularity: undefined,
    target_popularity: undefined,
  });

  // TODO: check if we actually need getSettingByName
  const [settings, setSettings, getSettingByName] = useSearchSettings({
    market: "EU",

    seed_genres: undefined,
    seed_tracks: undefined,
    seed_artists: undefined,
  });

  useEffect(() => {
    fetchAccountData().then((meRes) => {

    });
  }, []);

  const [trackList, setTrackList] = useState<Array<ITrack>>([]);

  const [newPlayListName, setNewPlayListName] = useState(
    `My ${settings['genre_seeds']}`
  );

  const getDefaultPlayListName = (seeds: Array<string>) =>
    `My ${seeds.join(", ")}`;

  useEffect(() => {
    try {
      const savedPlaylist = safeLocalStorage.getItem("playList");
      const parsedList = JSON.parse(savedPlaylist);
      if (parsedList && parsedList.length > 0) {
        setTrackList(parsedList);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const errorHandler = (e: JQueryXHR) => {
    fetchRefreshToken();
  };

  const fetchAccountData = () => {
    if (!me) {
      return userApi.getMe(accessToken).then((res) => {
        setMe(res);
        return res;
      }).catch(errorHandler);
    }
    return Promise.resolve(me);
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
        console.warn(error);
        setAuth(false);
      });
  };

  const fetchPlaylist = () => {
    const cleanSettings = cleanObject({...settings, optional: cleanObject(optionalSettings)})
    api
      .getTheTape(tracksCount, cleanSettings)
      .then((res) => {
        safeLocalStorage.setItem("playList", JSON.stringify(res));
        return res;
      })
      .then(setTrackList)
      .catch(errorHandler);
  };


  return !auth ? (
    <Redirect to="/public-home" />
  ) : !me ? (
    <Spinner />
  ) : (
        <div className="row g-0">
          <div className="col-lg-4 col-12 form-check bg-light rounded-10 p-3">
            
            <SeedSettings setSettings={setSettings} country={me.country} />

            <OptionalSettings setOptionalSettings={setOptionalSettings} />
            
          </div>
          <div className="col-lg-3 col-12 ps-lg-5 pt-3 pt-lg-0">
            <SavePlaylist
              name={newPlayListName}
              accessToken={accessToken}
              myId={me.id}
              trackList={trackList}
              fetchPlaylist={fetchPlaylist}
            />
            {trackList && trackList.length > 0 ? (
              <div className="">
                <PlayList
                  trackList={trackList}
                  updateTrackList={setTrackList}
                />
              </div>
            ) : (
              <>💃💃💃</>
            )}
          </div>
        </div>
  );
}

export default Home;