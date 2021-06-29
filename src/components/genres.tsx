import React, { useState } from 'react';
import CheckButton from './check-button';

function GenresList(props: any) {
    const [availableGenreSeeds, setAvailableGenreSeeds] = useState(['Rock', 'Pop', 'Blues']);

    const isSeedSelected = (seedName: string) => {
        return props.genreList.indexOf(seedName) !== -1;
    }

    const renderGenre = (genreName: string) => {
        return (<CheckButton
            key={`${genreName}-button`}
            isSelected={isSeedSelected(genreName)}
            buttonName={genreName}
            onChange={props.onGenreUpdate}></CheckButton>
        )
    }

    return (<div>
        GENRE SEEDS:
        <input />
        <div>
            ToDO: load genres by request
        </div>

        <div>{availableGenreSeeds.map(renderGenre)}</div>
    </div>)
}

export default GenresList;