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
      thisTrack: {},
      freshStart: true,
      gamesLeft: props.location.state.settings.tracksCount,
      resultsTable: [],

      ...props.location.state,
    };
    this.fetchAccountData = this.fetchAccountData.bind(this);
    this.fetchRefreshToken = this.fetchRefreshToken.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  componentDidMount() {
    api.getTheTape(
        this.state.accessToken,
        this.state.me.country,
        [this.state.genre],
        this.state.settings.tracksCount
      )
      .then((res) => {
        this.setState({ thisTrack: res[0] });
      }).catch(e => {
        errorHandler(e);
      });
  }

  async fetchAccountData() {
    const $this = this;

    await api.getMe(this.state.accessToken).then((me) => {
      $this.setState({ me });
    }).catch(e => {
      errorHandler(e);
    });
  }

  fetchRefreshToken() {
    const $this = this;
    $.ajax({
      url: "/refresh_token",
      data: {
        refresh_token: this.state.refreshToken,
      },
    })
      .done(function (data) {
        console.info("refresh_token is done", data);
        $this.setState({ me: data });
      })
      .catch(errorHandler);
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

    if (this.state.gamesLeft > 0) {
      this.setState({
        gamesLeft: this.state.gamesLeft - 1
      });
    }
  }

  render() {
    console.log("render started");
    return (
      <div>
        {this.state.modalActive ? "Yay" : ""}

        {this.state.thisTrack && this.state.gamesLeft > 0 ? <Player
          track={this.state.thisTrack}
        ></Player> : ''}

        <div>
          {this.state.thisTrack.alts && this.state.gamesLeft > 0
            ? this.state.thisTrack.alts.map((item, index) => (
                <Track
                  track={item}
                  key={"track-reccom-" + index}
                  className="button_"
                  onClick={this.selectAnswer.bind(this, item.id)}
                ></Track>
              ))
            : "Save playlist screen"}
        </div>

        <div>
          {this.state.iWin ? "WIN" : this.state.freshStart ? "" : "LOOSE"}
        </div>
      </div>
    );
  }
}

export default Play;
