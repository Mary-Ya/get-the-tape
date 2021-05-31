import React from 'react';
import { ITrack } from '../types/track';
function Artists(props: any) {
    return props.data.map((i: { name: any; }) =>`
        <span>${i.name}</span>
    `)
}

class Track extends React.Component<{track: ITrack, className: string}>  {   
    constructor (props: {track: ITrack}) {
      super(props);
    }

    render() {
        return <p {...this.props}>
            <a>{ this.props.track.name ? this.props.track.name : '' } 
                <Artists key={'artist' + this.props.track.id} data={this.props.track.artists}></Artists> 
            </a>
        </p>
    }
}  

export default Track;