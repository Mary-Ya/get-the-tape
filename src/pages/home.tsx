import React, { useState, useEffect, useRef, useCallback } from "react";
import { Redirect } from "react-router-dom";

import api from "../common/api";
import userApi from "../common/user-api";
import { divideArray, safeLocalStorage, cleanObject } from "../common/utils";
import { IArtist, ITrack } from "../types/track";
import { IMe } from "./../types/me";
import TrackList from "../components/track-list";

import SavePlaylist from "../components/save-playlist";
import SeedSettings from '../components/home/seed-settings';
import OptionalSettings from '../components/home/optional-settings';

import Spinner from "../components/spinner";

import useSearchSettings from "../hooks/use-search-settings";
import useCashableState from "../hooks/use-cashable-state";
import getRandomListName from "../common/name-gen";

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
  const [trackList, setTrackList] = useCashableState([], 'playList', []);

  // TODO: check if we actually need getSettingByName
  const [settings, setSettings, getSettingByName] = useSearchSettings({
    market: "EU",

    seed_genres: undefined,
    seed_tracks: undefined,
    seed_artists: undefined,
  });

  useEffect(() => {
    fetchAccountData();
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

  const fetchTrackList = () => {
    const cleanSettings = cleanObject({...settings, optional: cleanObject(optionalSettings)})
    api
      .getTheTape(tracksCount, cleanSettings)
      .then(setTrackList)
      .catch(errorHandler);
  };

  const trackListUpdateCallback = useCallback(setTrackList, [trackList]);

  return !auth ? (
    <Redirect to="/public-home" />
  ) : !me ? (
    <Spinner />
  ) : (
        <div className="row g-0">
          <div className="col-lg-3 col-12 form-check bg-light rounded-10 p-3">
            
            <SeedSettings setSettings={setSettings} country={me.country} />
            <OptionalSettings setOptionalSettings={setOptionalSettings} />
            
          </div>
          <div className="col-lg-7 col-12 ps-lg-7 pt-3 pt-lg-0 ms-lg-4 ">
            <SavePlaylist
              accessToken={accessToken}
              myId={me.id}
              trackList={trackList}
              fetchTrackList={fetchTrackList}
            />
            {trackList && trackList.length > 0 ? (
              <div className="">
                <TrackList
                  trackList={trackList}
                  updateTrackList={trackListUpdateCallback}
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
