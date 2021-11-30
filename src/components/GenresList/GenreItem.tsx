import React from "react";
import CheckButton from "@components/CheckButton";

interface IGenreItemProps {
    canAddMoreSeeds: boolean;
    isSelected: boolean;
    genreName: string;
    onChange: (genre: string) => void;
}

const GenreItem = ({genreName, canAddMoreSeeds, isSelected, onChange}: IGenreItemProps) => {
    return (
      <CheckButton
        disabled={!canAddMoreSeeds}
        key={`${genreName}-button`}
        isSelected={isSelected}
        buttonName={genreName}
        className={isSelected ? "d-none" : ""}
        onChange={onChange}
      ></CheckButton>
    );
};
  
export default GenreItem;