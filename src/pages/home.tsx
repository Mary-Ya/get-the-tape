import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../common/api";
import { safeLocalStorage } from "../common/utils";
import CheckButton from "../components/check-button";
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
  const [settings, setSettings] = useState({
    tracksCount: 10
  });

  const [seeds, setSeeds] = useState(['Rock']);
  const [availableGenreSeeds, setAvailableGenreSeeds] = useState(['Rock', 'Pop', 'Blues']);

  const [seedsCount, setSeedsCount] = useState(seeds.length);

  useEffect(() => {
    fetchAccountData().then((data) => {
      safeLocalStorage.setItem('accessToken', accessToken);
      safeLocalStorage.setItem('refreshToken', refreshToken);
    });
    fetchAccountData()
    // TODO: error handling
  }, [accessToken, refreshToken]);

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
      .catch(errorHandler);
  };

  const onGenreUpdate = (seedName: string) => {
    debugger;
    const seedIndex = seeds.indexOf(seedName);
    const newSeedState = [...seeds];
    if (seedIndex !== -1) {
      newSeedState.splice(seedIndex, 1);
    } else {
      newSeedState.push(seedName);
    }
    setSeeds(newSeedState);
  };

  const isSeedSelected = (seedName: string) => {
    return seeds.indexOf(seedName) !== -1;
  }

  const simpleDo = (param) => {
    console.log(param);
  }

  const renderGenre = (genreName: string) => {
    debugger;
    /*return <CheckButton key={`${genreName}-button`} isSelected={isSeedSelected(genreName)} buttonName={genreName}
      onChange={onGenreUpdate}></CheckButton>*/
    return  <div className="d-inline-block" key={`${genreName}-button`} >
      <input type="checkbox" className="btn-check" onChange={() => onGenreUpdate(genreName)} id={`${genreName}-input`} 
        checked={isSeedSelected(genreName)} autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor={`${genreName}-input`}  key={`${genreName}-label`} >{genreName}</label><br/>
    </div>
  }

  return (
    <div className="container px-0">
      <div className="row">
        <div className="col-4">
          Artist seed: 
          <br />
          ToDO: get tracks with keywords - no genres than
        </div>
          
        <div className="col-4 form-check">
          GENRE SEEDS:
          <input />
          <div>
            ToDO: load genres by request
          </div>
            ToDO: Make those checkboxes
          <button className="button-check" onClick={() => setGenre('rock')}>rock</button>
          <button className="button-check" onClick={() => setGenre('pop')}>pop</button>
          <button className="button-check" onClick={() => setGenre('folk')}>folk</button>
        
          <div>{availableGenreSeeds.map(renderGenre)}</div>
          

          <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" onChange={() => onGenreUpdate('pop')}
            autoComplete="off" checked={isSeedSelected('pop')}  />
          <label className="btn btn-outline-success" htmlFor="success-outlined">pop</label>

          <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" />
          <label className="btn btn-outline-danger" htmlFor="danger-outlined">Danger radio</label>
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
    </div>
  );
}

export default Home;
