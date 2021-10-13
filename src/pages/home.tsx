import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

import api from "../common/api";
import userApi from "../common/user-api";
import { divideArray, safeLocalStorage, cleanObject } from "../common/utils";
import GenresList from "../components/genres";
import { IArtist, ITrack } from "../types/track";
import { IMe } from "./../types/me";
import PlayList from "../components/track-list";

import SavePlaylist from "../components/save-playlist";

import Spinner from "../components/spinner";
import SeedSelector from "../components/home/selector-seed";
import SelectedSeed from "../components/home/selected-seed";
import ToggleAndRange from "../components/home/toggle-and-range";
import useSearchSettings from "../hooks/use-search-settings";
import useSeedList from "../hooks/use-seed-list";
import { IArtists, ITracks } from "../types/playlist";

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

  const [genreSeeds, setGenreSeeds, addGenre, removeGenreById, removeItem] = useSeedList(["rock"], 'genreSeeds');
  const [artistSeeds, setArtistSeeds, addArtist, removeArtistById] = useSeedList([], 'artistSeeds');
  const [songSeeds, setSongSeeds, addSong, removeSongById] = useSeedList([], 'songSeeds');

  const [canAddMoreSeeds, setCanAddMoreSeeds] = useState(false);

  const [trackList, setTrackList] = useState<Array<ITrack>>([]);

  const [newPlayListName, setNewPlayListName] = useState(
    `My ${genreSeeds.join(", ")}`
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

  useEffect(() => {
    fetchAccountData().then((meRes) => {
      
        // TODO: check maybe move to init hook
      if (songSeeds.length == 0) {
        api.getRandomTrack(meRes.country).then((songRes: ITracks) => {
          addSong(songRes.items[0]);
        });
      }

      // TODO: check maybe move to init hook
      if (artistSeeds.length == 0) {
        api.search(meRes.country, '', 1, 0, 'artist').then((artistRes: {artists: IArtists}) => {
          addArtist(artistRes.artists?.items[0]);
        });
      }
     
    });
    
    // TODO: error handling
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const genresCount = genreSeeds.length;
    const seedCount = genreSeeds.length + artistSeeds.length + songSeeds.length;
    setCanAddMoreSeeds(seedCount < 5);
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
      return userApi.getMe(accessToken).then((res) => {
        setMe(res);
        return res;
      }).catch(errorHandler);
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

  const selectGenre = (seedName: string) => {
    if (canAddMoreSeeds) {
      addGenre(seedName);
    };
  };

  const releaseGenre = (seedName: string) => {
    if (genreSeeds.length > 0) {
      removeItem(seedName);
    };
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
    removeSongById(track.id);
  };

  const removeSeedArtist = (artist: IArtist) => {
    removeArtistById(artist.id)
  };

  const renderSeedTrack = (track: ITrack, enabled: boolean) => {
    // TODO: fix double rendering here
    return (
      <SelectedSeed
        key={`${track.id}-seed-track-key`}
        id={`${track.id}-seed-track`}
        labelText={track.name}
        item={track}
        onClick={removeSeedTrack}
        enabled={enabled}
      />
    );
  };

  const renderSeedArtist = (artist: IArtist, enabled: boolean) => {
    // TODO: block selected item from rendering
    return (
      <SelectedSeed
        key={`${artist.id}-seed-artist-key`}
        id={`${artist.id}-seed-artist`}
        labelText={artist.name}
        item={artist}
        onClick={removeSeedArtist}
        enabled={enabled}
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
              canRemoveSeeds={genreSeeds.length > 1}
              genreList={genreSeeds}
              onGenreSelect={selectGenre}
              onGenreRelease={releaseGenre}
            />

            <div className="rounded-10 pt-3">
              Seed Songs: {songSeeds.map((s: ITrack) => renderSeedTrack(s, songSeeds.length > 1))}
              <SeedSelector
                selectedSeedsIds={songSeeds.map((i: ITrack) => i.id)}
                country={me.country}
                accessToken={accessToken}
                canAddMoreSeeds={canAddMoreSeeds}
                setSeeds={setSongSeeds}
                seeds={songSeeds}
                searchType={"track"}
              />
            </div>

            <div className="rounded-10 pt-3">
              Seed Artists: {artistSeeds.map((a: IArtist) => renderSeedArtist(a, artistSeeds.length > 1))}
              <SeedSelector
                selectedSeedsIds={artistSeeds.map((a: IArtist) => a.id)}
                country={me.country}
                accessToken={accessToken}
                canAddMoreSeeds={canAddMoreSeeds}
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