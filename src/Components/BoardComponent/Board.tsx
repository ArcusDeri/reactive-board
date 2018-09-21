import * as React from 'react';
import './Board.css';

interface IProps {
    location: IPropsLocation
}

interface IState {
    width: number,
    height: number
}

interface IPropsLocation {
    state?: IState
}

export class Board extends React.Component<IProps, IState> {

    private tiles = new Array();

    constructor(props: IProps){
        super(props);
        this.state = props.location.state ? props.location.state : {width: 3, height: 3};
    }

    public render () {
        return(
            <div className="board">
                <div className="tiles">
                    {this.createTiles()}
                </div>
            </div>
        );
    }

    private createTiles = () =>{
        const tileWidth = Math.floor(100 / this.state.width);
        const tileStyle = {
            flex: `1 1 calc(${tileWidth}% - 10px)`,
            fontSize: tileWidth * 15 + "%"
        }
        for (let y = 0; y < this.state.height; y++) {
            this.tiles.push([]);
            for (let x = 0; x < this.state.width; x++){
                this.tiles[y].push(
                    <div className="board-tile" style={tileStyle} key={`${x}${y}`}>
                        {y}{x}
                    </div>);
            }
        }
        return this.tiles;
    }
}