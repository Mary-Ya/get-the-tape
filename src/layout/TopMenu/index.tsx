import React, { useEffect } from "react";
import MiniTape from '@assets/mini-tape.svg';
import './style.scss';

import { NavLink, useLocation } from 'react-router-dom'

import Icons from "@common/icons";
import Input from "react-select/src/components/Input";
const MainMenu = () => {
  return (
    <div className="container">
      <div className="row align-items-end">
        <div className="col-2">
          <NavLink exact to="/" className="nav-link px-0 mr-5" activeClassName="menu__item--active">
            <MiniTape style={{ maxHeight: '47px' }} />
          </NavLink>
        </div>
        <div className="col-4 text-left">
          <NavLink exact to="/" className="nav-link px-0 mr-5" activeClassName="menu__item--active">
            GetTheTape
          </NavLink>
        </div>
        <div className="col-3 text-end">
          <NavLink to="/about" className="nav-link" activeClassName="menu__item--active">
            About
          </NavLink>
        </div>
        <div className="col-3 text-end">
          <NavLink to="/playlist" className="nav-link" activeClassName="menu__item--active">
            Playlist
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainMenu);