import React from "react";
import {
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

import TrackList from "./pages/playlist";
import Icons from "./assets/icons";
import PrivateRoute from "./components/private-route";

const App = () => {
  return (<div data-testid="app">
    <div className="container d-lg-none">
      <div className="row">
        <div className="col-4 text-center">
        </div>
        <div className="col-4 text-center">
          <Icons.Star></Icons.Star>
          <NavLink to="/" className="nav-link px-0 mr-5">GetTheTape</NavLink>
        </div>
        <div className="col-4 text-center">
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
        </div>
        <div className="col-4 text-center">
          <NavLink to="/playlist" className="nav-link" activeClassName="active">Playlist</NavLink>
        </div>
      </div>
    </div>
    <div className="d-flex align-items-start" data-testid="main-menu-desktop">
      <ul className="nav flex-column mt-lg-5 w-lg-10 d-none d-lg-flex py-3 ps-3 pe-5">
        <li className="nav-item text-center">
          <Icons.Star></Icons.Star>
          <NavLink to="/" className="nav-link px-0 mr-5">GetTheTape</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
        </li>
        <li>
          <NavLink to="/playlist" className="nav-link" activeClassName="active">Playlist</NavLink>
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

          <Route path="/public-home" component={PublicHome} />

          <Route path="/home" render={routeProps => (<PrivateRoute {...routeProps}>
                <Home></Home>
            </PrivateRoute>)} />

          <Route path="/play" component={Play} />

          <Route exact path="/playlist" render={routeProps => (<PrivateRoute {...routeProps}>
                <TrackList></TrackList>
            </PrivateRoute>)} />

          <Route exact path="/" render={routeProps => (<PrivateRoute {...routeProps}>
                <Home></Home>
            </PrivateRoute>)} />

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
