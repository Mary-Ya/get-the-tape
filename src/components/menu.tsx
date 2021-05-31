import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Menu() {
  const [genre, setGenre] = useState('rock');

  return (
    <div>
      <Link to='play' >
        PLAY!
      </Link>
    </div>
  );
}


export default Menu;