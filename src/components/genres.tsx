import React, { useEffect, useState } from 'react';
import api from '../common/api';
import CheckButton from './check-button';
import SelectedSeed from './home/selected-seed';

function GenresList(props: any) {
    const [availableGenreSeeds, setAvailableGenreSeeds] = useState(['rock', 'pop', 'blues']);
    const [searchQuery, setSearchQuery] = useState('');

    const isSeedSelected = (seedName: string) => {
        return props.genreList.indexOf(seedName) !== -1;
    }

    const loadGenres = () => {
        api.getGenres(props.accessToken).then((data) => {
            setAvailableGenreSeeds(data);
        });
    }

    useEffect(() => {
        loadGenres();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (searchQuery) {
                setAvailableGenreSeeds(availableGenreSeeds.filter(genresFilter));
            }

            // TODO: modify for smooth debouncing
        }, 500)
    }, [searchQuery])

    const renderGenre = (genreName: string) => {
        const isSelected = isSeedSelected(genreName);
        return (<CheckButton
            disabled={!props.canAddMoreSeeds}
            key={`${genreName}-button`}
            isSelected={isSelected}
            buttonName={genreName}
            className={isSelected ? 'd-none' : ''}
            onChange={props.onGenreSelect}></CheckButton>
        )
    };
    
    const renderSelectedGenre = (genreName: string) => {
        return (<SelectedSeed
            key={`${genreName}-removable-button`}
            id={`${genreName}-removable-seed-track`}
            labelText={genreName}
            item={genreName}
            onClick={props.onGenreRelease}
            enabled={props.canRemoveSeeds}
        />);
    };

    const genresFilter = ((item: string) => {
        return searchQuery.length > 1 ? item.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    });

    return (<div className={`${props.className || ''}`}>
        Seed genres: {props.genreList
            .map((selectedGenre: string) => (renderSelectedGenre(selectedGenre)))}
        <form>
            <input
                className="form-control rounded-pill"
                disabled={!props.canAddMoreSeeds}
                value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }}
            />
        </form>

        <div className="genres-list mt-2 pretty-scroll">
            {availableGenreSeeds
                .map((selectableGenre) => renderGenre(selectableGenre))}
        </div>
    </div>);
}

export default React.memo(GenresList);