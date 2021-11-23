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
import PrivateRoute from "./components/private-route";
import TopMenu from "./layout/TopMenu";

const App = () => {
  return (<div data-testid="app" className="container">
    <TopMenu data-testid="main-menu-desktop" />
    <div className="align-items-start mt-xxl-5 w-xxl-90">
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
  );
};

export default App;
