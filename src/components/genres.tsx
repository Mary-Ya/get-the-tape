import React, { useEffect, useState } from 'react';
import api from '../common/api';
import CheckButton from './check-button';

function GenresList(props: any) {
    const [availableGenreSeeds, setAvailableGenreSeeds] = useState(['Rock', 'Pop', 'Blues']);
    const [searchQuery, setSearchQuery] = useState('');

    const isSeedSelected = (seedName: string) => {
        return props.genreList.indexOf(seedName) !== -1;
    }

    const loadGenres = () => {
        api.getGenres(props.accessToken).then((data) => {
            console.log(data)
            setAvailableGenreSeeds(data);
        })
    }

    useEffect(() => {
        loadGenres()
    }, [])

    const renderGenre = (genreName: string) => {
        return (<CheckButton
            key={`${genreName}-button`}
            isSelected={isSeedSelected(genreName)}
            buttonName={genreName}
            onChange={props.onGenreUpdate}></CheckButton>
        )
    }

    const genresFilter = (item => {
        return searchQuery.length > 1 ? item.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    })


    return (<div>
        Selected: 
        <p>GENRE SEEDS: </p>
        {props.genreList.map(renderGenre)}
        <form>
            <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />
        </form>

        <div>{availableGenreSeeds.filter(genresFilter).map(renderGenre)}</div>
    </div>)
}

export default GenresList;