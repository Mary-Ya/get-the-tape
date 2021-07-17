import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import api from "../common/api";
import { safeLocalStorage } from "../common/utils";
import CheckButton from "../components/check-button";
import GenresList from "../components/genres";
import { ITrack } from "../types/track";
import { IMe } from "./../types/me";
import PlayList from "./play-list";

import { Handle, Range, SliderTooltip } from 'rc-slider';
import { IRecommendationSettings } from "../types/recommendation-settings";

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
  const [tracksCount, setTrackCount] = useState(10);

  const [settings, setSettings] = useState<IRecommendationSettings>({ limit: 10, market: 'EU' });

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

  // min_acousticness, max_acousticness 0.0 -1.0
  const [acousticness, setAcousticness] = useState([0.35, 1.33]);
  // target_acousticness

  // how suitable a track is for dancing 0 - 1 
  // min_danceability, max_danceability
  const [danceability, setDanceability] = useState([0.35, 4.10]);
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
  const [mode, setMode] = useState([ -0.31,  -0.31])
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

  const getDefaultPlayListName = (seeds: Array<string>) => (`My ${seeds.join(', ')}`);

  const rangeToObject = (dots: Array<number>, propertyName: string) => {
    let result: any = {};
    const minName = `min_${propertyName}`;
    const maxName = `max_${propertyName}`;

    result[minName] = dots[0];
    result[maxName] = dots[1];

    return result;
  }

  useEffect(() => {
    try {
      setTrackList(JSON.parse(safeLocalStorage.getItem('playList')));
    } catch (e) {
      console.warn(e)
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
    }).done(function (data) {
      console.info("refresh_token is done", data);
      setRefreshToken(data.refresh_token);
      setAccessToken(data.access_token);
    }).catch((error) => {
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
    setSettings(Object.assign(settings, {
      limit: tracksCount,
      market: me.country || 'EU',
      seed_genres: genreSeeds.join(',')
    }, rangeToObject(tempo, 'tempo')));
  };

  const fetchPlaylist = () => {
    combineSettings();
    api.getTheTape(
      accessToken,
      settings
    ).then((res) => {
        safeLocalStorage.setItem('playList', JSON.stringify(res));
        return res;
    }).then(setTrackList).catch(errorHandler);
  };

  
  const createPlayList = () => {
    api.savePlayListAsNew(accessToken, me.id, {
      name: 'Test1',
      description: 'Test1 desc',
      public: false
    }, trackList.map(i => i.uri)).then((res) => {
      setPlayListID(res.id);
    })
  };
  
  const renderHandle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} BPM`}
        visible={true}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };


  return !auth ? (
    <Redirect to="/public-home" />
  ) : !me ? (
    "loading"
  ) : (
    <div><div className="container px-0">
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
        </div>{/* <div className="row">
            <div className="col-12">
              Track seed:
              <br />
              ToDO: get tracks with keywords - no genres than
            </div>
          </div> */}<div className="row mt-3">
            <div className=" text-center">
              <Range pushable={true} allowCross={false} defaultValue={[80, 120]}
                min={63} max={205}
                handle={renderHandle}
                step={1}
                onChange={(e) => { setTempo(e) }} />
              
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
              <div><button onClick={() => {createPlayList()}}>SaveAsNew</button></div>
            </div> : ''}
    </div>
  );
}

export default Home;
