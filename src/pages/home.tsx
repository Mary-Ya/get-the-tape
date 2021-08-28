import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import AsyncSelect from "react-select/async";

import api from "../common/api";
import { divideArray, safeLocalStorage } from "../common/utils";
import GenresList from "../components/genres";
import { IArtist, ITrack } from "../types/track";
import { IMe } from "./../types/me";
import PlayList from "./play-list";

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

import { IRecommendationSettings } from "../types/recommendation-settings";

import { createBrowserHistory } from "history";
import SavePlaylist from "../components/save-playlist";

import playListApi from "../common/api-playlist";
import apiPlaylist from "../common/api-playlist";
import Spinner from "../components/spinner";
import SongSeed from "../components/home/seed-selector";
import SeedSelector from "../components/home/seed-selector";
import SelectedSeed from "../components/home/selected-seed";

interface IListRequestSettings {
  market: string
  seed_genres: string
  seed_tracks: string
  seed_artists: string
  min_tempo?: number
  max_tempo?: number
  min_instrumentalness?: number
  max_instrumentalness?: number
  min_popularity?: number
  max_popularity?: number
}

const deserialize = (search: string) =>
  Object.fromEntries(new URLSearchParams(search));

function Home(props: any) {
  const history = useHistory();

  const [genre, setGenre] = useState("rock");
  const [accessToken, setAccessToken] = useState(
    deserialize(props.location.search).access_token
  );
  const [refreshToken, setRefreshToken] = useState(
    deserialize(props.location.search).refresh_token
  );
  const [me, setMe] = useState<IMe | null>();
  const [auth, setAuth] = useState(true);
  const [tracksCount, setTrackCount] = useState(10);
  const [settings, setSettings] = useState<IRecommendationSettings>({
    market: "EU",
  });

  const [genreSeeds, setGenreSeeds] = useState(["rock"]);
  const [artistSeeds, setArtistSeeds] = useState<Array<IArtist>>([]);
  const [songSeeds, setSongSeeds] = useState<Array<ITrack>>([]);

  const [canAddMoreSeeds, setCanAddMoreSeeds] = useState(false);
  const [canRemoveSeeds, setCanRemoveSeeds] = useState(false);

  const [trackList, setTrackList] = useState<Array<ITrack>>([]);

  const [newPlayListName, setNewPlayListName] = useState(
    `My ${genreSeeds.join(", ")}`
  );
  const [playListID, setPlayListID] = useState("");

  const [enabledParams, setEnabledParams] = useState({
    'instrumentalness': false,
    'popularity': false,
    'tempo': false,
  });

  // min_acousticness, max_acousticness 0.0 -1.0
  const [acousticness, setAcousticness] = useState([0.35, 1.33]);
  // target_acousticness

  // how suitable a track is for dancing 0 - 1
  // min_danceability, max_danceability
  const [danceability, setDanceability] = useState([0.35, 4.1]);
  //target_danceability

  // min_duration_ms, max_duration_ms
  const [duration, setDuration] = useState([2000, 4000]);
  // target_duration_ms

  // perceptual measure of intensity and activity -0.2 - 1.2
  // min_energy, max_energy
  const [energy, setEnergy] = useState([0.35, 3.15]);
  // target_energy

  // predicts whether a track contains no vocals
  // min_instrumentalness, max_instrumentalness
  const [instrumentalness, setInstrumentalness] = useState([0.35, 1.71]);
  //target_instrumentalness

  // 0 = C, 1 = C♯/D♭, 2 = D
  // min_key, max_key [0 - 11]
  const [key, setKey] = useState([1, 10]);
  // target_key

  // the presence of an audience in the recording: 0.35
  // min_liveness, max_liveness
  const [liveness, setLiveness] = useState([0.4, 0.86]);
  //target_liveness

  // The overall loudness of a track in decibels -60 - 0
  // min_loudness, max_loudness
  const [loudness, setLoudness] = useState([-0.15, 0.7]);
  // target_loudness

  // the modality (major or minor)
  // min_mode,max_mode
  const [mode, setMode] = useState([-0.31, -0.31]);
  // target_mode

  // min_popularity, max_popularity
  const [popularity, setPopularity] = useState([0.4, 0.86]);
  // target_popularity

  // min_speechiness, max_speechiness
  const [speechiness, setSpeechiness] = useState([0.4, 0.86]);
  // target_speechiness

  // Target tempo (BPM)
  // min_tempo, max_tempo 205 - 63
  // Tempos are also related to different Genres: Hip Hop 85–95 BPM, Techno 120–125 BPM, House & Pop 115–130 BPM, Electro 128 BPM, Reggaeton >130 BPM, Dubstep 140 BPM
  const [tempo, setTempo] = useState([140, 160]);
  // target_tempo
  // min_time_signature, max_time_signature
  const [timeSignature, setTimeSignature] = useState([140, 160]);
  // target_time_signature

  // musical positiveness
  // min_valence, max_valence 0.04 - 0.96 (0 - 1)
  const [valence, setValence] = useState([-0.5, 6.5]);
  // target_valence

  const toggleParamEnabled = (e: React.ChangeEvent<HTMLInputElement>, paramName: string) => {
    setEnabledParams(prev => ({...prev, [paramName]: e.target.checked}))
    console.log(paramName, enabledParams);
  };

  const getDefaultPlayListName = (seeds: Array<string>) =>
    `My ${seeds.join(", ")}`;

  const rangeToObject = (dots: Array<number>, propertyName: string) => {
    let result: any = {};
    const minName = `min_${propertyName}`;
    const maxName = `max_${propertyName}`;

    result[minName] = dots[0];
    result[maxName] = dots[1];

    return result;
  };

  useEffect(() => {
    try {
      setTrackList(JSON.parse(safeLocalStorage.getItem("playList")));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    fetchAccountData().then((data) => {
      safeLocalStorage.setItem("accessToken", accessToken);
      safeLocalStorage.setItem("refreshToken", refreshToken);
    });
    // fetchAccountData();
    // TODO: error handling
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const genresCount = genreSeeds.length;
    const seedCount = genreSeeds.length + artistSeeds.length + songSeeds.length;
    setCanAddMoreSeeds(seedCount < 5);
    setCanRemoveSeeds(seedCount < 2);
    getDefaultPlayListName([...genreSeeds]);

    setNewPlayListName(
      `My ${genresCount ? genreSeeds.join(", ") : "playlist"}`
    );
  }, [genreSeeds, artistSeeds, songSeeds]);

  const errorHandler = (e: JQueryXHR) => {
    fetchRefreshToken();
  };

  const fetchAccountData = () => {
    if (!me) {
      return api.getMe(accessToken).then(setMe).catch(errorHandler);
    } else {
      return Promise.reject(Error("Can't fetchAccountData"));
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
        console.warn(error);
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

  const combineSettings = () => {
    let newSettings: IRecommendationSettings = Object.assign(
      settings,
      {
        // limit: tracksCount,
        market: me.country || "EU",
        seed_genres: genreSeeds.join(","),
        seed_tracks: songSeeds.map((i: ITrack) => i.id).join(","),
        seed_artists: artistSeeds.map((i: IArtist) => i.id).join(","),
      },
      /* rangeToObject(tempo, "tempo"),
      rangeToObject(instrumentalness, "instrumentalness"),
      rangeToObject(popularity, "popularity") */
    )
    Object.keys(enabledParams)
      .forEach((param) => {
        const rangeInObject = rangeToObject(eval(param), param);
        if (enabledParams[param as keyof typeof enabledParams]) {
          newSettings = {...newSettings, ...rangeInObject};        
        } else {
          for(const i in rangeInObject) {
            delete newSettings[i as keyof typeof newSettings]
          }
        }
      })
    console.log('newSettings: ' + newSettings);
    setSettings(newSettings);
  };

  const fetchPlaylist = () => {
    // TODO: do DRY
    combineSettings();
    api
      .getTheTape(accessToken, tracksCount, settings)
      .then((res) => {
        safeLocalStorage.setItem("playList", JSON.stringify(res));
        return res;
      })
      .then(setTrackList)
      .catch(errorHandler);
  };

  const startGame = () => {
    combineSettings();
    api
      .getTheTape(accessToken, tracksCount, settings)
      .then((res) => {
        // TODO: do DRY
        safeLocalStorage.setItem("playList", JSON.stringify(res));
        history.push("/play", {
          me,
          accessToken,
          refreshToken,
          genre,
          settings,
          tracksCount,
          tracks: res,
        });
      })
      .catch(errorHandler);
  };

  const createPlayList = () => {
    playListApi
      .savePlayListAsNew(
        accessToken,
        me.id,
        {
          name: newPlayListName,
          description: "Test1 desc",
          public: false,
        },
        trackList.map((i) => i.uri)
      )
      .then((res) => {
        setPlayListID(res.id);
      });
  };

  const removeSeedTrack = (track: ITrack) => {
    const newSongSeeds = songSeeds.filter((i: ITrack) => i.id !== track.id);
    setSongSeeds(newSongSeeds);
  };

  const removeSeedArtist = (artist: IArtist) => {
    const newSeeds = artistSeeds.filter((i: IArtist) => i.id !== artist.id);
    setArtistSeeds(newSeeds);
  };

  const renderSeedTrack = (track: ITrack) => {
    // TODO: fix double rendering here
    return (
      <SelectedSeed
        key={`${track.id}-seed-track-key`}
        id={`${track.id}-seed-track`}
        labelText={track.name}
        data={track}
        onClick={removeSeedTrack}
      />
    );
  };

  const renderSeedArtist = (artist: IArtist) => {
    // TODO: block selected item from rendering

    return (
      <SelectedSeed
        key={`${artist.id}-seed-artist-key`}
        id={`${artist.id}-seed-artist`}
        labelText={artist.name}
        data={artist}
        onClick={removeSeedArtist}
      />
    );
  };

  return !auth ? (
    <Redirect to="/public-home" />
  ) : !me ? (
    <Spinner />
  ) : (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-4 form-check bg-light rounded-10 p-3">
            <GenresList
              canAddMoreSeeds={canAddMoreSeeds}
              canRemoveSeeds={canRemoveSeeds}
              accessToken={accessToken}
              genreList={genreSeeds}
              onGenreUpdate={onGenreUpdate}
            />

            <div className="rounded-10 pt-3">
              Seed Songs: {songSeeds.map(renderSeedTrack)}
              <SeedSelector
                selectedSeeds={songSeeds.map((i) => i.id)}
                country={me.country}
                accessToken={accessToken}
                canAddMoreSeeds={canAddMoreSeeds}
                seedCount={
                  songSeeds.length + artistSeeds.length + genreSeeds.length
                }
                setSeeds={setSongSeeds}
                seeds={songSeeds}
                searchType={"track"}
              />
            </div>

            <div className="rounded-10 pt-3">
              Seed Artists: {artistSeeds.map(renderSeedArtist)}
              <SeedSelector
                selectedSeeds={artistSeeds.map((i) => i.id)}
                country={me.country}
                accessToken={accessToken}
                canAddMoreSeeds={canAddMoreSeeds}
                seedCount={
                  songSeeds.length + artistSeeds.length + genreSeeds.length
                }
                setSeeds={setArtistSeeds}
                seeds={artistSeeds}
                searchType={"artist"}
              />
            </div>

            <div className="row">
              <div className="text-start pt-3 col-12">
                    Tempo: {tempo[0]} - {tempo[1]}
              </div>
              <div className="col-1">
                <input
                  name='tempo-check'
                  className="form-check-input ms-0"
                  type="checkbox"
                  defaultChecked={enabledParams['tempo']}
                  onChange={(e) => { toggleParamEnabled(e, 'tempo') }}
                />
              </div>
              <div className="col-11">
                <Range
                  pushable={true}
                  allowCross={false}
                  defaultValue={[63, 205]}
                  min={63}
                  max={205}
                  step={1}
                  onChange={(e: number[]) => {
                    setTempo(divideArray(e));
                  }}
                  disabled={!enabledParams['tempo']}
                />
              </div>
            </div>
              <div className="row">
                <div className="text-start pt-3 col-12">
                  Instrumentalness: {`${instrumentalness[0]} - ${instrumentalness[1]}`}
                </div>
                <div className="col-1">
                  <input
                    name='instrumentalness-check'
                    className="form-check-input ms-0"
                    key={Math.random()}
                    type="checkbox"
                    defaultChecked={enabledParams['instrumentalness']}
                    onChange={(e) => {
                      toggleParamEnabled(e, "instrumentalness");
                    }}
                  />
                </div>
                <div className={"col-11 "}>
                  <Range
                    pushable={true}
                    allowCross={false}
                    defaultValue={[0, 200]}
                    min={0}
                    max={200}
                    step={1}
                    onChange={(e: number[]) => {
                      setInstrumentalness(divideArray(e));
                      }}
                      disabled={!enabledParams['instrumentalness']}
                  />
                </div>
              </div>

              <div className="row">
                <div className="text-start pt-3 col-12">
                  Popularity: {popularity[0]} - {popularity[1]}
                </div>
                <div className="col-1">
                    <input
                      name='popularity-check'
                      className="form-check-input ms-0"
                      type="checkbox"
                      value={enabledParams['popularity']}
                      onChange={(e) => {
                        toggleParamEnabled(e, "popularity");
                      }}
                  />
                </div>
                <div className="col-11">
                  <Range
                    disabled={!enabledParams['popularity']}
                    pushable={true}
                    allowCross={false}
                    defaultValue={[0, 100]}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(e: number[]) => {
                      setPopularity(divideArray(e));
                      }}
                  />
                </div>
              </div>
          </div>
          <div className="col-8 ">
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
              ""
            )}
          </div>
        </div>
        </div>
        </div>
  );
}

export default Home;
