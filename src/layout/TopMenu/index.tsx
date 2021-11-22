import React, { useEffect } from "react";
import './style.scss';

import { NavLink, useLocation } from 'react-router-dom'

import Icons from "./../../assets/icons";
const MainMenu = () => {
  return (
    <div className="container">
      <div className="row align-items-end">
        <div className="col-2 text-center">
          <NavLink exact to="/" className="nav-link px-0 mr-5" activeClassName="menu__item--active"><Icons.Star className="d-inline-block"></Icons.Star></NavLink>
        </div>
        <div className="col-4 text-center">
          <NavLink exact to="/" className="nav-link px-0 mr-5" activeClassName="menu__item--active">
            GetTheTape
          </NavLink>
        </div>
        <div className="col-3 text-center">
          <NavLink to="/about" className="nav-link" activeClassName="menu__item--active">
            About
          </NavLink>
        </div>
        <div className="col-3 text-center">
          <NavLink to="/playlist" className="nav-link" activeClassName="menu__item--active">
            Playlist
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainMenu);
