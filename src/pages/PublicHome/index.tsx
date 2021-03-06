import React from "react";
import './styles.scss';
import TapeJumLg from '@assets/tape-jum-lg.svg';
import TapeJumMobile from '@assets/tape-mini.svg';
import TapeWithPencil from '@assets/tape-with-pencil.svg';
import Icons from '@common/icons';

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
          <a href="#wgh" className="text-decoration-none"><span className="read-more--text">Read more</span></a>
        </p>
        <div className="read-more read-more--break"/>
        <div className="mt-5">
          <div>
            <a href="/login" className="btn btn-spotify rounded-pill">Log in with Spotify</a>
          </div>
          <span className="login__register">Don’t have an account yet? Register now!</span>
        </div>
        <a className="d-inline-block up-button mt-5" href="#wgh">
          <Icons.Down height="33" width="33" />
        </a>
      </div>
      <div className="col-sm-4 pull-right d-none d-sm-flex public-home__slide--bg">
        <TapeJumLg />
      </div>
    </div>
    <div className="public-home__slide--mobile d-block d-sm-none">
        <TapeJumMobile />
      </div>
    <div className="row mb-5" style={{minHeight: '35vh'}}>
      <div className="col">
        <h2 className="display-3" id="wgh">What’s gonna happen?</h2>
        <ol className="list">
          <li>You will choose “seed” track, song and artist</li>
          <li>You will choose optional settings (if you want)</li>
          <li>You will see a playlist, built with Spotify recommendation API based on your choices</li>
          <li>Congratulations! Now you can save it to your account to listen afterwords</li>
        </ol>
      </div>
    </div>
    <div className="row mt-5" style={{minHeight: '50vh'}}>
      <div className="col-md-6 col-12">
        <div><TapeWithPencil style={{ maxHeight: '315px' }}/></div>
      </div>
      <div className="col-md-6 col-12">
        <h2 className="display-4">F.A.Q.</h2>
          <dl className="">
            <dt className="">* Do I need to register at GetTheTape?</dt>
            <dd className="">- No. You only need a Spotify account.</dd>
            <dt className="">* Do you store my data? </dt>
            <dd className="">- GTT stores you data in your browser only. 
              <br/>It doesn’t even have a data base.</dd>
          </dl>
      </div>
    </div>
    <div className="row my-5 public-home__footer">
      <div className="col-12 p-5 fs-5">
        <p>This is a work in progress that started as a practice in React.js</p>
        <p>See a bug? Feel free to post <a href="https://github.com/Mary-Ya/get-the-tape/issues" target="_blank">issue on GitHub</a></p>
        <p>Looking for a Frontend Web Developer? Contact me on GitHub or through <a href="https://www.linkedin.com/in/mary-ya/" target="_blank">LinkedIn</a></p>
      </div>
    </div>
  </div>
);

export default PublicHome;
