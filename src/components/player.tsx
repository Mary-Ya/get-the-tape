import { map } from 'lodash';
import React from 'react';
import { ITrack } from '../types/track';

class Player extends React.Component<{track: ITrack}, any> {   
    constructor (props: Readonly<{track: ITrack}>) {
      super(props);
      this.state = { 
        audioTrack: new Audio(),
        isPlaying: false
      };
      this.playAudio = this.playAudio.bind(this);
      this.pauseAudio = this.pauseAudio.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
      if (this.props.track.preview_url && prevProps.track.preview_url !== this.props.track.preview_url) {
        prevState.audioTrack.pause();
        this.initAudio();
      }
    }

    initAudio() {
      this.setState({audioTrack: new Audio(this.props.track.preview_url || this.props.track.href)});
    }

    playAudio() {
        this.state.audioTrack.play();
        this.setState({isPlaying: true});
    }
    pauseAudio() {
        try {
          this.state.audioTrack.pause();
          this.setState({isPlaying: false});
        } catch (e) {
          console.log(e);
        }
    }

    componentWillUnmount() {
      this.pauseAudio();
    }

    render() {
        let elements = this.props.track ? <div>
          
          <button className="button_" onClick={this.playAudio} disabled={!this.props.track.preview_url}> PLAY </button>
          <button className="button_" onClick={this.pauseAudio} disabled={!this.props.track.preview_url && this.state.isPlaying}> STOP </button>
        </div> : '';

        return <div>{elements}</div>
    }
}  

export default Player;