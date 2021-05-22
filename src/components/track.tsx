import React from 'react';
function Artists(props: any) {
    return props.data.map((i: { name: any; }) =>`
        <span>${i.name}</span>
    `)
}

class Track extends React.Component {   
    constructor (props: {track: any} | Readonly<{track: Array<any>}>) {
      super(props);
      this.state = { 
        track: props.track,
      };
    }

    render() {
        console.log(this.state.track)
        return <p {...this.props}>
            <a>{ this.state.track.name ? this.state.track.name : '' } 
                <Artists key={'artist' + this.state.track.id} data={this.state.track.artists}></Artists> 
            </a>
        </p>
    }
}  

export default Track;