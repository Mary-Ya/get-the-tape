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
import PlayList from "./pages/play-list";

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
  
  return (<div>
    <div className="container d-lg-none">
      <div className="row">
        <div className="col-4 text-center">
          
        </div>
        <div className="col-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          <NavLink to="/" className="nav-link px-0 mr-5">GetTheTape</NavLink>
        </div>
        <div className="col-4 text-center">
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
        </div>
      </div>
    </div>
    <div className="d-flex align-items-start">
      <ul className="nav flex-column mt-lg-5 w-lg-10 d-none d-lg-flex py-3 ps-3 pe-5">
        <li className="nav-item text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          <NavLink to="/" className="nav-link px-0 mr-5">GetTheTape</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
        </li>
      </ul>
      <div className="d-flex mt-lg-5 w-lg-90">
        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/login">
            <SpotifyLogin />
          </Route>

          <Route path="/home" component={Home} />
          <Route path="/public-home" component={PublicHome} />

          <Route path="/play" component={Play} />
          
          <Route path="/play-list" component={PlayList} />

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
    </div>
  );
};

export default App;
