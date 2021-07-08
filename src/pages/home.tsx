import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import api from "../common/api";
import { safeLocalStorage } from "../common/utils";
import CheckButton from "../components/check-button";
import GenresList from "../components/genres";
import { IMe } from "./../types/me";

const deserialize = (search: string) =>
  Object.fromEntries(new URLSearchParams(search));

function Home(props: any) {
  const [genre, setGenre] = useState("rock");
  const [accessToken, setAccessToken] = useState(
    deserialize(props.location.search).access_token
  );
  const [refreshToken, setRefreshToken] = useState(
    deserialize(props.location.search).refresh_token
  );
  const [me, setMe] = useState<IMe | null>();
  const [auth, setAuth] = useState(true);
  const [settings, setSettings] = useState({
    tracksCount: 10
  });

  const [genreSeeds, setGenreSeeds] = useState(['Rock']);
  
  const [artistSeeds, setArtistSeeds] = useState([]);
  const [availableArtistSeeds, setAvailableArtistSeeds] = useState([]);
  
  const [songSeeds, setSongSeeds] = useState([]);
  const [availableSongSeeds, setAvailableSongSeeds] = useState([]);
  
  const [canAddMoreSeeds, setCanAddMoreSeeds] = useState(false);

  useEffect(() => {
    fetchAccountData().then((data) => {
      safeLocalStorage.setItem('accessToken', accessToken);
      safeLocalStorage.setItem('refreshToken', refreshToken);
    });
    fetchAccountData()
    // TODO: error handling
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const seedCount = genreSeeds.length + artistSeeds.length + songSeeds.length;
    setCanAddMoreSeeds(seedCount > 4);
  }, [genreSeeds, artistSeeds, songSeeds])

  const errorHandler = (e: JQueryXHR) => {
    console.warn(e);
    fetchRefreshToken();
  };

  const fetchAccountData = () => (
    api.getMe(accessToken).then((me) => {
      console.info("me is done", me);
      setMe({ ...me });

      // TODO: save me to sessionStorage
    }).catch(e => {
      errorHandler(e);
    })
  );

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
        setAuth(false)
      });
  };

  const onGenreUpdate = (seedName: string) => {
    debugger;
    const seedIndex = genreSeeds.indexOf(seedName);
    const newSeedState = [...genreSeeds];
    if (seedIndex !== -1) {
      newSeedState.splice(seedIndex, 1);
    } else {
      newSeedState.push(seedName);
    }
    setGenreSeeds(newSeedState);
  };

  return (!auth ? <Redirect to='/public-home' /> : me ? 
    <div className="container px-0">
      <div className="row">
        <div className="col-4">
          <div className="">Artist seed: 
            <br />
            ToDO: get tracks with keywords - no genres than
          </div>
        </div>
          
        <div className="col-4 form-check">
          <div className=""><GenresList canAddMoreSeeds={canAddMoreSeeds} accessToken={accessToken} genreList={genreSeeds} onGenreUpdate={onGenreUpdate} /></div>
        </div>
        <div className="col-4">
        Track seed: 
          <br />
          ToDO: get tracks with keywords - no genres than
          </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 text-center">          
        Popular: 
          <br />
          ToDO: popular scale min_popularity max_popularity
          <br />
          
          SWITCH: TOPS, TOPS AND MIDDLES, LEAST POPULAR, RANDOM: 
            
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 text-center">
          <Link
            to={{
              pathname: "/play",
              state: { me, accessToken, refreshToken, genre, settings },
            }}
          >
            GET THE TAPE!
          </Link>
        </div>
      </div>
    </div> : 'loading'
  );
}

export default Home;
