import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import About from "./pages/about";
import Play from "./pages/play";
import SpotifyLogin from "./pages/spotify-login";
import Home from "./pages/home";
import PublicHome from "./pages/public-home";
import NoMatch from "./pages/no-match";

import { safeLocalStorage } from './common/utils';
import api from "./common/api";

const App = () => {
  // TODO: check refreshToken in LocalStorage
  // if can retrieve accessToken: loggedIn = true

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [spinnerIsOn, setSpinnerIsOn] = useState(true);
  const [refresh_token, setRefreshTokes] = useState('')
  const [access_token, setAccessTokes] = useState('')
  useEffect(() => {
    const refreshToken = safeLocalStorage.getItem('refreshToken');
    if (refreshToken) {
      api.getNewTokens(refreshToken).then(data => {
        if (data.refresh_token && data.access_token) {
          setRefreshTokes(data.refresh_token);
          setAccessTokes(data.access_token);
          setIsLoggedIn(true);
          setSpinnerIsOn(false);
        } 
      });
    } else {
      setSpinnerIsOn(false);
    };
  }, [])
  
  return (
    <div>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/login">
            <SpotifyLogin />
          </Route>

          <Route path="/home" component={Home} />

          <Route path="/play" component={Play} />

          <Route exact path="/">
            {spinnerIsOn ? 'Loading...' : ''}
            {!spinnerIsOn && isLoggedIn ? <Redirect to={{
              pathname: `/home?access_token=${access_token}&refresh_token=${refresh_token}`
            }} /> : <PublicHome />}
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
