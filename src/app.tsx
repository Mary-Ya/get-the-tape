import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  NavLink,
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
  const [refresh_token, setRefreshTokes] = useState('');
  const [access_token, setAccessTokes] = useState('');

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
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink to="/" className="nav-link px-0 mr-5" >GetTheTape</NavLink>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 right">
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="container mt-lg-5">
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
            {!spinnerIsOn && isLoggedIn ? <Redirect to={
              `/home?access_token=${access_token}&refresh_token=${refresh_token}`
            } /> : <PublicHome />}
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
