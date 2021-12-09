import React, { useEffect, useState } from "react";
import api from "@api/api";
import useSeedList from "@hooks/use-seed-list";
import { IArtists, ITracks } from "@interfaces/playlist";
import { IArtist, ITrack } from "@interfaces/track";

import GenresList from "@components/GenresList/GenresList";
import SelectedSeed from "@components/home/selected-seed";
import SeedSelector from "@components/home/SelectorSeed";
import { IMe } from "@interfaces/me";

interface TSeedSettingsProps {
  setSettings: (seeds: any) => void,
  country: string,
  me: IMe,
}

function SeedSettings(props: TSeedSettingsProps) {

  const [genreSeeds, setGenreSeeds, addGenre, removeGenreById, removeItem] = useSeedList(["rock"], 'genreSeeds');
  const [artistSeeds, setArtistSeeds, addArtist, removeArtistById] = useSeedList([], 'artistSeeds');
  const [songSeeds, setSongSeeds, addSong, removeSongById] = useSeedList([], 'songSeeds');

  const [canAddMoreSeeds, setCanAddMoreSeeds] = useState(false);

  useEffect(() => {
    props.setSettings({
      seed_artists: artistSeeds.map((i: IArtist) => i.id).join(",")
    });
  }, [artistSeeds]);

  useEffect(() => {
    props.setSettings({
      seed_tracks: songSeeds.map((i: ITrack) => i.id).join(","),
    });
  }, [songSeeds]);
  
  useEffect(() => {
    if(props.country) {
      if (songSeeds.length == 0) {
        api.getRandomTrack(props.country).then((songRes: ITracks) => {
          addSong(songRes.items[0]);
        });
      }
      if (artistSeeds.length == 0) {
        api.search(props.country, '', 1, 0, 'artist').then((artistRes: {artists: IArtists}) => {
          addArtist(artistRes.artists?.items[0]);
        });
      }
    }
  }, [props.me]);
  
  useEffect(() => {
    const genresCount = genreSeeds.length;
    const seedCount = genreSeeds.length + artistSeeds.length + songSeeds.length;
    setCanAddMoreSeeds(seedCount < 5);
  }, [genreSeeds, artistSeeds, songSeeds]);

  const removeSeedTrack = (track: ITrack) => {
    removeSongById(track.id);
  };

  const removeSeedArtist = (artist: IArtist) => {
    removeArtistById(artist.id)
  };

    const selectGenre = (seedName: string) => {
      if (canAddMoreSeeds) {
        addGenre(seedName);
        props.setSettings({
          seed_genres: genreSeeds.join(","),
        })
      };
    };

    const releaseGenre = (seedName: string) => {
      if (genreSeeds.length > 0) {
        removeItem(seedName);
      };
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
  

  return <>
      <GenresList
        canAddMoreSeeds={canAddMoreSeeds}
        canRemoveSeeds={genreSeeds.length > 1}
        selectedGenresList={genreSeeds}
        onGenreSelect={selectGenre}
        onGenreRelease={releaseGenre} className={""}      />
      
      <div className="rounded-10 pt-3">
        Seed Songs: {songSeeds.map((s: ITrack) => renderSeedTrack(s, songSeeds.length > 1))}
        <SeedSelector
          selectedSeedsIds={songSeeds.map((i: ITrack) => i.id)}
          country={props.country}
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
          country={props.country}
          canAddMoreSeeds={canAddMoreSeeds}
          setSeeds={setArtistSeeds}
          seeds={artistSeeds}
          searchType={"artist"}
        />
      </div>
    </>
}

const areEqual = (prevProps, nextProps: {prevProps: TSeedSettingsProps, nextProps: TSeedSettingsProps}) => (prevProps.country == nextProps.country);

export default React.memo(SeedSettings, areEqual);