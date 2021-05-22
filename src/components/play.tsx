import React, {useState, useCallback} from "react";
import {
    useLocation
} from "react-router-dom";

import Track from './track';

import api from '../common/api'
import _ from 'lodash';
import Player from './player';

const deserialize = (search: string) => Object.fromEntries(new URLSearchParams(search));
const errorHandler = (e: any) => {console.log(e)};

class Play extends React.Component {   
  constructor (props: {} | Readonly<{modalActive: Boolean, searchInUrl: string, accessToken: String, refreshToken: String, me: any, thisTrack: any, recommendations: Array<any>}>) {
    super(props);
    this.state = { 
      modalActive: false,
      accessToken: deserialize(props.location.search).access_token,
      refreshToken: deserialize(props.location.search).refresh_token,
      me: {},
      thisTrack: {},
      recommendations: [],
      freshStart: true,
    };
    this.fetchAccountData = this.fetchAccountData.bind(this);
    this.fetchRefreshToken = this.fetchRefreshToken.bind(this);
    this.fetchRecommendation = this.fetchRecommendation.bind(this);
    this.fetchRandomTrackAndRecommendation = this.fetchRandomTrackAndRecommendation.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  async fetchAccountData () {
    const $this = this;
    await api.getMe(this.state.accessToken)
      .then(me => {
          console.info('me is done', me);
          $this.setState({me});
        })
  }

  fetchRandomTrackAndRecommendation (genre = '') {
    const $this = this;
    this.setState({freshStart: true})
      api.getRandomTrack(this.state.me.country, this.state.accessToken, `genre:"${genre}"`).then(res => {
        this.setState({thisTrack: res});
        console.log('fetchRandomTrack', res.items[0].name);
        $this.fetchRecommendation ();
      }).catch((response: any) => {
          console.log(response);
      });
  }

  fetchRecommendation () {
    const $this = this;
    const trackId = _.get(this.state.thisTrack, 'items[0].id');
    console.log('fetchRecommendation', this.state.thisTrack.items[0].name);
    $.ajax({
      url: '/recommendations',
      data: {
        'access_token': this.state.accessToken,
        'id': trackId
      }
    }).done(function(data) {
      const recommendations = _.clone(data.tracks);
      recommendations.push($this.state.thisTrack.items[0]);
      console.log('fetchRecommendation', recommendations);
      $this.setState({recommendations: []});
      $this.setState({recommendations: _.shuffle(recommendations)});
    }).catch(errorHandler);
  }

  fetchRefreshToken () {
    const $this = this;
    $.ajax({
      url: '/refresh_token',
      data: {
        'refresh_token': this.state.refreshToken
      }
    }).done(function(data) {
      console.info('refresh_token is done', data);
      $this.setState({me: data});
    }).catch(errorHandler);
  };

  selectAnswer(id) {
    this.setState({iWin: this.state.thisTrack.items[0].id === id, freshStart: false});
  }

  render () { 
    console.log('render started')
      return (
        <div>
            { this.state.modalActive ? 'Yay' : '' }
              <button className="button_" onClick={this.fetchAccountData}>fetchAccountData</button>
              <button className="button_" onClick={this.fetchRefreshToken}>fetchRefreshToken</button>
              <button className="button_" onClick={this.fetchRandomTrackAndRecommendation.bind(this, '')}>fetchRandomTrackAndRecommendation </button>

              <button className="button_" onClick={this.fetchRandomTrackAndRecommendation.bind(this, 'rock')}>fetch rock</button>
              <button className="button_" onClick={this.fetchRandomTrackAndRecommendation.bind(this, 'pop')}>fetch pop</button>
              <button className="button_" onClick={this.fetchRandomTrackAndRecommendation.bind(this, 'folk')}>fetch folk</button>

              <p>{ this.state.me.country }</p>
              <p>{ this.state.thisTrack && this.state.thisTrack.items ? this.state.thisTrack.items[0].name : ''}</p>
              <Player track={this.state.thisTrack && this.state.thisTrack.items ? this.state.thisTrack.items[0] : {}}></Player>

              <div>{this.state.recommendations ? this.state.recommendations.map((item, index) => 
                <Track track={item} key={'track-reccom-' + index}
                  className="button_" onClick={this.selectAnswer.bind(this, item.id)}
                ></Track>
              ) : 'Loading recommendations'}</div>

              <div>{this.state.iWin ? 'WIN' : this.state.freshStart ? '' : 'LOOSE'}</div>
        </div>
      );
  }
}

export default Play;
