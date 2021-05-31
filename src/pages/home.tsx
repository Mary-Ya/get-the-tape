import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../common/api";
import { safeLocalStorage } from "../common/utils";
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
  const [me, setMe] = useState<IMe|null>();
  const [settings, setSettings] = useState({tracksCount: 10});

  const updateUserDataInLocalStorage = () => {};

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
        setRefreshToken( data.refresh_token );
        setAccessToken( data.access_token );
      })
      .catch(errorHandler);
  };

  return (
    <div>
      <p>My country: { me ? me.country : 'unknown' }</p>
      <br />
      GENRE: 
      <button className="button_" onClick={() => setGenre('rock')}>rock</button>
      <button className="button_" onClick={() => setGenre('pop')}>pop</button>
      <button className="button_" onClick={() => setGenre('folk')}>folk</button>
      
      SWITCH: TOPS, TOPS AND MIDDLES, LEAST POPULAR, RANDOM: 

      SONGS COUNT ON A TAPE: 
      <Link
        to={{
          pathname: "/play",
          state: { me, accessToken, refreshToken, genre, settings },
        }}
      >
        PLAY!
      </Link>
    </div>
  );
}

export default Home;
