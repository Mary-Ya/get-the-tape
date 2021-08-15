import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";

import { IMe } from "../types/me";

import Track from "../components/track";
import Player from "../components/player";

import api from "../common/api";
import { ITrack } from "../types/track";
import { IPlayState } from "../types/play-state";
import { errorHandler } from "../common/utils";


class Play extends React.Component<{}, IPlayState> {
  constructor(props: any | Readonly<{}>) {
    super(props);
    this.state = {
      modalActive: false,
      thisTrack: props.location.state.tracks[0],
      freshStart: true,
      gamesLeft: props.location.state.tracks.length,
      resultsTable: [],

      level: [],
      tracks: props.location.state.tracks,
      ...props.location.state,
    };
    /*this.fetchAccountData = this.fetchAccountData.bind(this);
    this.fetchRefreshToken = this.fetchRefreshToken.bind(this);*/
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  componentDidMount() {
    this.nextLevel();
  }

  selectAnswer(id: string) {
    const roundResult = {
      iWin: this.state.thisTrack.id === id,
      track: this.state.thisTrack
    };
    let resultsTableTemp = this.state.resultsTable;
    resultsTableTemp.push(roundResult)
    this.setState({
      resultsTable: resultsTableTemp,
    });
    const thisTrack = this.state.tracks[this.state.gamesLeft - 1];
    if (this.state.gamesLeft > 0) {
      this.setState({
        gamesLeft: this.state.gamesLeft - 1,
        thisTrack: thisTrack
      });
      
      const tempLevel = [thisTrack].concat(thisTrack.alts);
      const shuffledArray = tempLevel.sort((a, b) => 0.5 - Math.random());

      this.setState({
        level: shuffledArray
      });
    }
  }

  nextLevel() {
    let tempLevel = [this.state.thisTrack].concat(this.state.thisTrack.alts);
    const shuffledArray = tempLevel.sort((a, b) => 0.5 - Math.random());

    this.setState({
      level: shuffledArray
    })
  }

  render() {
    return (
      <div>
        {this.state.modalActive ? "Yay" : ""}

        {this.state.thisTrack && this.state.gamesLeft > 0 ? <audio
                    id={`audio-${this.state.thisTrack.id}`}
                    controls={true}
                    src={this.state.thisTrack.preview_url || this.state.thisTrack.href}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio> : ''}
        
        <div className="row">
          <div className="col-6">
            {this.state.thisTrack.alts && this.state.gamesLeft > 0
              ? this.state.level.map((item, index) => (
                  <Track controls={false}
                    track={item}
                    key={"track-reccom-" + index}
                    className="button_"
                    onClick={this.selectAnswer.bind(this, item.id)}
                  ></Track>
                ))
              : "Save playlist screen"}
          </div>

          <div className="col-6">
            {this.state.resultsTable.map((item, index) => (
              <div className={item.iWin ? 'bg-success' : 'bg-warning'}
                key={"track-result-" + index}><Track controls={true}
                    track={item.track}
                    key={"track-result-" + item.track.id}
                    className="button_"
                    onClick={null}
                  ></Track>
              </div>
            ))
            }
          </div>
        </div>

        <div>
          {this.state.iWin ? "WIN" : this.state.freshStart ? "" : "LOOSE"}
        </div>
      </div>
    );
  }
}

export default Play;
