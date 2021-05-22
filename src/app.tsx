import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from "./pages/about";
import Play from "./components/play";
import SpotifyLogin from "./pages/spotify-login";
import Home from "./pages/home";
import NoMatch from "./no-match";

const App = () => (
  <div>
    <ul>
      <li><Link to="/about" >About</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/home">Home</Link></li>
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

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
</div>
);

export default App;