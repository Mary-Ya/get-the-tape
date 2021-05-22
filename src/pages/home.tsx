import React from "react";
import Play from '../components/play';

class Home extends React.Component { 
    
    constructor(props: {}) {
        super(props);
        this.state = {
            startGame: false,
        }
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        this.setState({startGame: true})
    }

    render() {
        return <div>
            <div>

            </div>
            <div>
                { this.state.startGame ? '' : <a onClick={this.startGame}>PLAY</a> }
            </div>
            <div>
                { this.state.startGame ? <Play {...this.props}/> : '' }
            </div>    
        </div>
    }
};

export default Home;