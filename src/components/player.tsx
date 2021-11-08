import React, { useState } from 'react';
import useSimpleAudio from 'use-simple-audio';
import icons from '../assets/icons';

const Player = (props: {src: string, id: string, loop?: boolean, className?:string}) => {
  const { play, pause, stop } = useSimpleAudio(props.src, props.loop);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayer = (toPlay: boolean) => {
    setIsPlaying(toPlay);
    if (toPlay) {
      play();
    } else {
      pause();
    }
  };

  return (<div className={`button-wrapper ${props.className}`} key={props.id}>
    {isPlaying ?
      <div className="play-button"
        onClick={() => togglePlayer(false)}>
        <icons.Pause width={20} height={20} />
      </div> :
      <div className="play-button"
        onClick={() => togglePlayer(true)}>
          <icons.Play width={20} height={20} />
      </div>}
  </div>)
}

export default Player;