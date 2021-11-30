import React from "react";

const PublicHome = () => (
  <div className="jumbotron public-home__slide full-height">
    <div className="row g-0 h-100 justify-content-between">
      <div className="col-sm-4 pt-sm-5">
        <h1 className="display-3">GET THE TAPE</h1>
        <p className="lead">
          TL:DR
          <br />Playlist generator for Spotify
        </p>
        <p className="mt-2 fw-bolder text-center read-more">
          <span className="read-more--text">Read more</span>
        </p>
        <div className="read-more read-more--break"/>
        <div className="mt-5">
          <div>
              <a href="/login" className="btn btn-spotify rounded-pill">Log in with Spotify</a>
          </div>
          <span className="login__register">Don’t have an account yet? Register now!</span>
        </div>
      </div>
      <div className="col-sm-4 pull-right d-none d-sm-flex public-home__slide--bg"></div>
    </div>
    <div className="row full-height">
      <div className="col">
        <h2>About</h2>
      </div>
    </div>
  </div>
);

export default PublicHome;
