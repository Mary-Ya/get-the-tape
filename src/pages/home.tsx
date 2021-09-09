import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import api from "../common/api";
import { divideArray, safeLocalStorage, cleanObject } from "../common/utils";
import GenresList from "../components/genres";
import { IArtist, ITrack } from "../types/track";
import { IMe } from "./../types/me";
import PlayList from "../components/track-list";

import SavePlaylist from "../components/save-playlist";

import Spinner from "../components/spinner";
import SeedSelector from "../components/home/seed-selector";
import SelectedSeed from "../components/home/selected-seed";
import ToggleAndRange from "../components/home/toggle-and-range";
import useCashableState from "../hooks/use-cashable-state";
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

  const [genreSeeds, setGenreSeeds] = useCashableState(["rock"], 'genreSeeds');
  const [artistSeeds, setArtistSeeds] = useCashableState([], 'artistSeeds');
  const [songSeeds, setSongSeeds] = useCashableState([], 'songSeeds');

  const [canAddMoreSeeds, setCanAddMoreSeeds] = useState(false);
  const [canRemoveSeeds, setCanRemoveSeeds] = useState(false);

  const [trackList, setTrackList] = useState<Array<ITrack>>([]);

  const [newPlayListName, setNewPlayListName] = useState(
    `My ${genreSeeds.join(", ")}`
  );

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
  const [instrumentalness, setInstrumentalness] = useCashableState([0.35, 1.71], 'instrumentalness');
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
  const [popularity, setPopularity] = useCashableState([4, 86], 'popularity');
  // target_popularity

  // min_speechiness, max_speechiness
  const [speechiness, setSpeechiness] = useState([0.4, 0.86]);
  // target_speechiness

  // Target tempo (BPM)
  // min_tempo, max_tempo 205 - 63
  // Tempos are also related to different Genres: Hip Hop 85–95 BPM, Techno 120–125 BPM, House & Pop 115–130 BPM, Electro 128 BPM, Reggaeton >130 BPM, Dubstep 140 BPM
  const [tempo, setTempo] = useCashableState([140, 160], 'tempo');
  // target_tempo
  // min_time_signature, max_time_signature
  const [timeSignature, setTimeSignature] = useState([140, 160]);
  // target_time_signature

  // musical positiveness
  // min_valence, max_valence 0.04 - 0.96 (0 - 1)
  const [valence, setValence] = useState([-0.5, 6.5]);
  // target_valence

  const getDefaultPlayListName = (seeds: Array<string>) =>
    `My ${seeds.join(", ")}`;

  useEffect(() => {
    // ToDO: add random song and artist
    try {
      setTrackList(JSON.parse(safeLocalStorage.getItem("playList")));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    fetchAccountData();
    
    // TODO: error handling
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const genresCount = genreSeeds.length;
    const seedCount = genreSeeds.length + artistSeeds.length + songSeeds.length;
    setCanAddMoreSeeds(seedCount < 5);
    setCanRemoveSeeds(seedCount < 4 && genreSeeds.length > 0 && artistSeeds.length > 0 && songSeeds.length > 0);
    getDefaultPlayListName([...genreSeeds]);

    setNewPlayListName(
      `My ${genresCount ? genreSeeds.join(", ") : "playlist"}`
    );

    setSettings({
      seed_genres: genreSeeds.join(","),
      seed_tracks: songSeeds.map((i: ITrack) => i.id).join(","),
      seed_artists: artistSeeds.map((i: IArtist) => i.id).join(",")
    });
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

  const fetchPlaylist = () => {
    const cleanSettings = cleanObject({...settings, optional: cleanObject(optionalSettings)})
    api
      .getTheTape(accessToken, tracksCount, cleanSettings)
      .then((res) => {
        safeLocalStorage.setItem("playList", JSON.stringify(res));
        return res;
      })
      .then(setTrackList)
      .catch(errorHandler);
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
        <div className="row g-0">
          <div className="col-lg-4 col-12 form-check bg-light rounded-10 p-3">
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
                selectedSeedsIds={songSeeds.map((i) => i.id)}
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
                selectedSeedsIds={artistSeeds.map((i) => i.id)}
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
                <ToggleAndRange
                  label='Tempo'
                  name='tempo'
                  defaultChecked={false}
                  rangeProps={{
                    min: 63,
                    max: 205,
                    step: 1,
                    defaultValue: [63, 205],
                    pushable: false,
                    allowCross: false
                  }}
                  onUpdate={(data) => {
                    setOptionalSettings(data);
                  }}
                />
                <ToggleAndRange
                  label='Instrumentalness'
                  name='instrumentalness'
                  defaultChecked={false}
                  rangeProps={{
                    min: 0,
                    max: 200,
                    step: 1,
                    defaultValue: [35, 171],
                    pushable: false,
                    allowCross: false
                  }}
                  onUpdate={(data) => {
                    setOptionalSettings(data);
                  }}
                  intervalFormat={divideArray}
                />
                <ToggleAndRange
                  label='Popularity'
                  name='popularity'
                  defaultChecked={false}
                  rangeProps={{
                    min: 0,
                    max: 100,
                    step: 1,
                    defaultValue: [40, 86],
                    pushable: false,
                    allowCross: false
                  }}
                  onUpdate={(data) => {
                    setOptionalSettings(data);
                  }}
                  // intervalFormat={divideArray}
                />
          </div>
          <div className="col-lg-8 col-12 ps-lg-5 pt-3 pt-lg-0">
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
