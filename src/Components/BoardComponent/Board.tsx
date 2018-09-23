import * as React from 'react';
import { Tile, IRgbColor, defaultTileColor } from '../TileComponent/Tile';
import { BoardButton } from './BoardButtonComponent/BoardButton';
import './Board.css';
import { isNull } from 'util';

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
    private tilesReferences = new Array<Array<Tile | null>>();
    private tilesStates: any;

    constructor(props: IProps){
        super(props);
        this.state = props.location.state ? props.location.state : {width: 3, height: 3};
        this.tilesStates = [];
    }

    public render () {
        return(
            <div className="board">
                <div className="tiles">
                    {this.createTiles()}
                </div>
                <div onClick={this.resetTiles}>
                    <BoardButton displayText="Reset"/>
                </div>
                <div onClick={this.displayJSON}>
                    <BoardButton displayText="JSON"/>
                </div>
            </div>
        );
    }

    private createTiles = () =>{
        const tileWidth = Math.floor(100 / this.state.width);
        
        for (let y = 0; y < this.state.height; y++) {
            this.tiles.push([]);
            this.tilesStates.push([]);
            this.tilesReferences.push(new Array<Tile>());
            for (let x = 0; x < this.state.width; x++){
                const tileKey = x + " " + y;
                const dims = {x, y};
                this.tilesStates[y].push( defaultTileColor );
                this.tiles[y].push(<Tile ref={(tile) => this.tilesReferences[y].push(tile)} key={tileKey} width={tileWidth} dimensions={dims} onColorChange={this.updateColorOfXY}/>);
            }
        }
        return this.tiles;
    }

    private resetTiles = () => {
        this.tilesReferences.forEach(row => row.forEach(tile => {
            if(!isNull(tile)){
                tile.reset();
            }
        }));
    }

    private updateColorOfXY = (color: IRgbColor, x: number, y: number) => {
        this.tilesStates[y][x] = {r: color.r, g: color.g, b: color.b};
    }

    private displayJSON = () => alert(JSON.stringify(this.tilesStates));
}
