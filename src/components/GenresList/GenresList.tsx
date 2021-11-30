import React, { useEffect, useState } from "react";
import api from "@api/api";
import useList from "@hooks/use-list";
import GenreItem from "./GenreItem";
import SelectedGenreItem from "./SelectedGenreItem";

const DEFAULT_GENRES = [
  "rock",
  "pop",
  "blues",
];

interface GenresProps {
  selectedGenresList: string[];
  className: string;
  canAddMoreSeeds: boolean;
  canRemoveSeeds: boolean;
  onGenreSelect: (genre: string) => void;
  onGenreRelease: (genre: string) => void;
};

function GenresList(props: GenresProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [availableGenreSeeds, setAvailableGenreSeeds] = useState(DEFAULT_GENRES);
  const [visibleGenreSeeds, setVisibleGenreSeeds, setFilteredVisibleGenreSeeds] =
    useList(availableGenreSeeds);

  const isSeedSelected = (seedName: string) => {
    return props.selectedGenresList.indexOf(seedName) !== -1;
  };

  useEffect(() => {
    api.getGenres().then((data) => {
      setAvailableGenreSeeds(data);
      setFilteredVisibleGenreSeeds(data, searchQuery);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (searchQuery) {
        setFilteredVisibleGenreSeeds(availableGenreSeeds, searchQuery);
      }
    }, 500);
  }, [searchQuery]);

  return (
    <div className={`${props.className || ""}`}>
      Seed genres:
      {props.selectedGenresList.map((selectedGenre: string) =>
        <SelectedGenreItem
          key={`genre-selected-item-${selectedGenre}`}
          genreName={selectedGenre}
          onGenreRelease={props.onGenreRelease}
          canRemoveSeeds={props.canRemoveSeeds}/>
      )}
      <form>
        <input
          className="form-control rounded-pill"
          disabled={!props.canAddMoreSeeds}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </form>
      <div className="genres-list mt-2 pretty-scroll">
        {visibleGenreSeeds.map((selectableGenre: string) =>
          <GenreItem key={`genre-selectable-item-${selectableGenre}`}
            canAddMoreSeeds={props.canAddMoreSeeds}
            isSelected={isSeedSelected(selectableGenre)}
            genreName={selectableGenre}
            onChange={props.onGenreSelect}
          />
        )}
      </div>
    </div>
  );
}

export default GenresList;