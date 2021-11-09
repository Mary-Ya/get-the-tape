import React from "react";
import { IArtist, ITrack } from "../types/track";
import Icons from "../assets/icons";
import { SortableHandle } from "react-sortable-hoc";
import Player from "./player";
import { getRandomNumber } from "../common/utils";

const renderArtist = (artist: IArtist) => {
  return (
    <a
      target="_blank"
      key={`artist_${artist.id}`}
      href={artist.external_urls?.spotify || "#"}
      className="fs-6 me-2"
    >
      {artist.name}
    </a>
  );
}

class Track extends React.Component<{
  track: ITrack;
  className: string;
  controls: boolean;
  onClick: any;
  remove?: any;
  shuffle: () => void
}, { [key: string]: any}> {
  constructor(props: {
    track: ITrack;
    className: string;
    controls: boolean;
    onClick: any;
    remove?: any;
    shuffle: () => void
  }) {
    super(props);
    this.state = {
      DraggableHandle: SortableHandle(({ children }) => children),
      track: this.props.track
    };
  }
  
  render() {
    const track = this.state.track;
/**
 * TODO: make hover styles
 */
    return (
      <>
        <div className="col-2 col-xs-2">
          <div className="row g-0 h-100">
            <this.state.DraggableHandle>
              <div className="col-3 h-100 align-items-center px-2">
                <Icons.List height={18} width={18} className='card card-block h-100 align-items-center handler-container'/>
              </div>
            </this.state.DraggableHandle>
            <div className="col-9 align-self-center">
              <a
                className="mr-1"
                href={track.album.external_urls.spotify}
                target="_blank"
              >
                <img height="78" className="img-fluid logo-container" src={track.album.images[0].url}></img>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-9">
          <a target="_blank" href={track.external_urls.spotify} className="fs-4">
            {track.name}
          </a>
          <br />
          {track.artists.map(renderArtist)}
          <i className="bi-alarm"></i>
        </div>
        <div className={`col-lg-2 col-12 d-flex content-right align-content-end pe-lg-3 ${this.props.controls ? "" : "d-none"}`}
        >
          <div className="ms-auto button-wrapper ms-2">
            <div className="remove-button"
                onClick={this.props.shuffle}>
                <Icons.Shuffle className="shuffle-button"
                  width={20} height={20}
                ></Icons.Shuffle>
            </div>
          </div>
          <Player className="mx-2"
            id={`audio-${track.id}`}
            src={track.preview_url || track.href}
            loop={true}
          />
          <div className="button-wrapper">
            <div className="remove-button"
              onClick={() => { this.props.remove(track.id) }}>
              <Icons.Remove className="remove-button"
                width={20} height={20}
              ></Icons.Remove>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default React.memo(Track);
