import React, { useEffect, useState } from 'react';
import api from '../common/api';
import CheckButton from './check-button';

function GenresList(props: any) {
    const [availableGenreSeeds, setAvailableGenreSeeds] = useState(['rock', 'pop', 'blues']);
    const [searchQuery, setSearchQuery] = useState('');

    const isSeedSelected = (seedName: string) => {
        return props.genreList.indexOf(seedName) !== -1;
    }

    const loadGenres = () => {
        api.getGenres(props.accessToken).then((data) => {
            setAvailableGenreSeeds(data);
        })
    }

    useEffect(() => {
        loadGenres()
    }, [])

    const renderGenre = (genreName: string, isInFetchedList: boolean) => {
        const isSelected = isSeedSelected(genreName);
        return (<CheckButton
            disabled={isInFetchedList && props.canAddMoreSeeds}
            key={`${genreName}-button`}
            isSelected={isSelected}
            buttonName={genreName}
            className={isInFetchedList && isSelected ? 'd-none' : ''}
            onChange={props.onGenreUpdate}></CheckButton>
        )
    }

    const genresFilter = ((item: string) => {
        return searchQuery.length > 1 ? item.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    })


    return (<div>
        { props.genreList.map((selectedGenre: string) => (renderGenre(selectedGenre, false))) }
        <form>
            <input
                className="form-control rounded-pill"
                value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }}
            />
        </form>

        <div className="genres-list mt-2 pretty-scroll">
            {availableGenreSeeds.filter(genresFilter).map((selectableGenre) => renderGenre(selectableGenre, true))}
        </div>
    </div>)
}

export default GenresList;