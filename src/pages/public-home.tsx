import React from "react";
import Login from "./spotify-login";
import TapesUrl from "./About/assets/tapes-normal.svg";

const PublicHome = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm">
        <Login />
        OR "GET SPOTIFY FREE"
      </div>
      <div className="col-sm">
        <img src={TapesUrl} />
      </div>
    </div>
  </div>
);

export default PublicHome;
