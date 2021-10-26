import React from "react";
import { IArtist, ITrack } from "../types/track";
import Icons from "../assets/icons";
import { SortableHandle } from "react-sortable-hoc";
import Player from "./player";

function Artists(props: any) {
  return props.data.map(
    (i: { name: any }) => `
        <span>${i.name}</span>
    `
  );
}

class Track extends React.Component<{
  track: ITrack;
  className: string;
  controls: boolean;
  onClick: any;
  remove?: any;
}, { [key: string]: any}> {
  constructor(props: {
    track: ITrack;
    className: string;
    controls: boolean;
    onClick: any;
    remove?: any;
  }) {
    super(props);
    this.state = {
      DraggableHandle: SortableHandle(({ children }) => children)
    };
  }
  renderArtist(artist: IArtist) {
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

  render() {
    const i = this.props.track;

    return (
      <div
        className={`row gx-0  my-1 py-1 justify-content-left track-row ${this.props.className}`}
        onClick={this.props.onClick}
        key={`song-${i.id}`}
      >
        <div className="col-3 col-xs-2">
          <div className="row g-0 h-100">
            <this.state.DraggableHandle>
              <div className="col-3 h-100 align-items-center px-2">
                <Icons.List height={18} width={18} className='card card-block h-100 align-items-center handler-container'/>
              </div>
            </this.state.DraggableHandle>
            <div className="col-9 align-self-center">
              <a
                className="mr-1"
                href={i.album.external_urls.spotify}
                target="_blank"
              >
                <img className="img-fluid  logo-container" src={i.album.images[0].url}></img>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-9">
          <a target="_blank" href={i.external_urls.spotify} className="fs-4">
            {i.name}
          </a>
          <br />
          {i.artists.map(this.renderArtist)}
          <i className="bi-alarm"></i>
        </div>
        <div
          className={`col-lg-1 col-12 d-flex ${this.props.controls ? "" : "d-none"}`}
        >
          <Player
            id={`audio-${i.id}`}
            src={i.preview_url || i.href}
            loop={true}
          />
          <div className="button-wrapper ms-2">
            <div className="remove-button"
              onClick={() => { this.props.remove(i.id) }}>
              <Icons.Remove className="remove-button"
                width={20} height={20}
              ></Icons.Remove>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default React.memo(Track);
