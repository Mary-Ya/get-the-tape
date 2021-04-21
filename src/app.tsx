import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from "./about";
import Play from "./play";
import SpotifyLogin from "./spotify-login";
import Home from "./home";
import NoMatch from "./no-match";

const App = () => (
  <div>
    <div>
      <Link to="/about" >About</Link>
      <Link to="/play/666">PLAY</Link>
      <Link to="/play">Login</Link>
      <Link to="/">Home</Link>
    </div>
    <div>
  <Switch>
    {/* If the current URL is /about, this route is rendered
        while the rest are ignored */}
    <Route path="/about">
      <About />
    </Route>

    {/* Note how these two routes are ordered. The more specific
        path="/contact/:id" comes before path="/contact" so that
        route will render when viewing an individual contact */}
    <Route path="/play/:id">
      <Play />
    </Route>
    <Route path="/play">
      <SpotifyLogin />
    </Route>

    {/* If none of the previous routes render anything,
        this route acts as a fallback.

        Important: A route with path="/" will *always* match
        the URL because all URLs begin with a /. So that's
        why we put this one last of all */}
    <Route path="/">
      <Home />
    </Route>

    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
</div>
</div>
);

export default App;