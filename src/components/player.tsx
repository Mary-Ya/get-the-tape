import React from 'react';
import { ITrack } from '../types/track';
import Icons from "../assets/icons";

interface IPlayerProps {
  track: ITrack, currentTrack: string, isPlaying: boolean, playAudio: any, pauseAudio: any
}

class Player extends React.Component<IPlayerProps, any> {   
    constructor (props: Readonly<IPlayerProps>) {
      super(props);
      /*this.playAudio = this.playAudio.bind(this);
      this.pauseAudio = this.pauseAudio.bind(this);*/
    }
    
    /*componentDidUpdate(prevProps, prevState) {
      if (this.props.track.preview_url && prevProps.track.preview_url !== this.props.track.preview_url) {
        prevState.this.props.audioTrack.pause();
        this.initAudio();
      }
    }

    initAudio() {
      this.setState({audioTrack: new Audio(this.props.track.preview_url || this.props.track.href)});
    }*/
/*
  playAudio() {
        this.initAudio();
        this.props.audioTrack.play();
        this.setState({isPlaying: true});
    }
    pauseAudio() {
        try {
          this.props.audioTrack.pause();
          this.setState({isPlaying: false});
        } catch (e) {
          console.log(e);
        }
    }
*/
    componentWillUnmount() {
      this.props.pauseAudio();
  };
  
  playIsDisabled() { return !this.props.track.preview_url || this.props.isPlaying };
  pauseIsDisabled() { return !this.props.track.preview_url && !this.props.isPlaying };
  
  render() {
    let elements = this.props.track ? <div>
          <audio
              id={`audio-${this.props.track.id}`}
              controls={false}
              src={this.props.track.preview_url || this.props.track.href}>
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
          {/* 
          <button className="btn" onClick={() => { this.props.playAudio(this.props.track.preview_url) }}
            disabled={this.playIsDisabled()}> <Icons.Play></Icons.Play> </button>
          <button className="btn" onClick={() => { this.props.pauseAudio() }}
            disabled={this.pauseIsDisabled()}> <Icons.Pause></Icons.Pause> </button> */}
        </div> : '';

        return <div>{elements}</div>
    }
}  

export default Player;