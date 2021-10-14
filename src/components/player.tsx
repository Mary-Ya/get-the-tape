import React, { useState } from 'react';
import useSimpleAudio from 'use-simple-audio';
import icons from '../assets/icons';

const Player = (props: {src: string, id: string, loop?: boolean}) => {
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

  return (<div key={props.id}>
    {isPlaying ? <div onClick={() => togglePlayer(false)}><icons.Pause /></div> :
  <div onClick={() => togglePlayer(true)}><icons.Play /></div>}
  </div>)
}

export default Player;