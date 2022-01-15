import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import About from "@pages/About";
import Home from "@pages/Home";
import PublicHome from "@pages/PublicHome";
import NoMatch from "@pages/NoMatch";
import TrackList from "@pages/Playlist";

import PrivateRoute from "@layout/PrivateRoute";

const App = () => {
  return (<div data-testid="app" className="container">
    <div className="align-items-start w-xxl-90">
        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/public-home" component={PublicHome} />

          <Route path="/home" render={routeProps => (<PrivateRoute {...routeProps}>
                <Home></Home>
            </PrivateRoute>)} />

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
