import React from 'react';
import { IArtist, ITrack } from '../types/track';
import Icons from "../assets/icons";

function Artists(props: any) {
    return props.data.map((i: { name: any; }) =>`
        <span>${i.name}</span>
    `)
}

class Track extends React.Component<{track: ITrack, className: string, controls: boolean, onClick: any}>  {   
    constructor (props: {track: ITrack, className: string, controls: boolean, onClick: any}) {
      super(props);
    }
    renderArtist(artist: IArtist) {
        return <a target="_blank" key={`artist_${artist.id}`}
            href={artist.external_urls?.spotify || '#'} className="fs-6 me-2">
            {artist.name}
        </a>
    }

    
    render() {
        const i = this.props.track;

        return <div className={`row g-0 my-3 justify-content-left ${this.props.className}`}
            onClick={this.props.onClick}
            key={`song-${i.id}`}>
        <div className="col-3 col-xs-2 logo-container">
            <a className="mr-1" href={i.external_urls.spotify} target="_blank">
                <Icons.Logo></Icons.Logo>
            </a>
        </div>
        <div className="col-lg-4 col-9">
            <a target="_blank" href={i.external_urls.spotify} className="fs-4">{i.name}</a>
            <br />
            { i.artists.map(this.renderArtist) }
            <i className="bi-alarm"></i>
        </div>
        <div className={`col-lg-1 col-12 ${ this.props.controls ? '' : 'd-none'}`}>
            <audio
                id={`audio-${i.id}`}
                controls={true}
                src={i.preview_url || i.href}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </div>
    </div>
    }
}  

export default Track;