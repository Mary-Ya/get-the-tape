import React from "react";
import SelectedSeed from "../home/selected-seed";

interface ISelectedGenreProps {
    genreName: string;
    canRemoveSeeds: boolean;
    onGenreRelease: (genre: string) => void;
}

const SelectedGenreItem = ({genreName, onGenreRelease, canRemoveSeeds}: ISelectedGenreProps) => {
    return (
      <SelectedSeed
        key={`${genreName}-removable-button`}
        id={`${genreName}-removable-seed-track`}
        labelText={genreName}
        item={genreName}
        onClick={onGenreRelease}
        enabled={canRemoveSeeds}
      />
    );
};
  
export default SelectedGenreItem;