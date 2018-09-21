import * as React from 'react';
import { Tile } from '../TileComponent/Tile';
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
        
        for (let y = 0; y < this.state.height; y++) {
            this.tiles.push([]);
            for (let x = 0; x < this.state.width; x++){
                const tileKey = x + " " + y;
                this.tiles[y].push(<Tile key={tileKey} width={tileWidth} x={x} y={y}/>);
            }
        }
        return this.tiles;
    }
}