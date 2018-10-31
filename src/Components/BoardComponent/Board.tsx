import * as React from 'react';
import { Tile, IRgbColor, defaultTileColor } from '../TileComponent/Tile';
import { BoardButton } from './BoardButtonComponent/BoardButton';
import './Board.css';
import { isNull } from 'util';

interface IProps {
    location: ILocationProps
}

interface IState {
    tiles: boolean[][];
}

interface ILocationProps {
    state?: { width: number, height: number }
}

export class Board extends React.Component<IProps, IState> {

    private static readonly defaultBoardSize = 3;

    constructor(props: IProps){
        super(props);
        const initialWidth = props.location.state ? props.location.state.width : Board.defaultBoardSize;
        const initialHeight = props.location.state ? props.location.state.height : Board.defaultBoardSize;

        this.state = {
            tiles: [...Array(initialWidth)].map(() => Array(initialHeight).fill(false))
        }
    }

    public componentDidMount = () => {
        this.setBoardElements();
    }

    public render () {
        return(
            <div className="board">
                <div className="tiles">
                    {this.state.tiles.map((row, r)=><div key={r}>
                        {row.map((cell, c)=><Tile key={c} color={cell?{r: 100, g: 100, b: 0}:{r:255, g: 255, b: 255}} onClick={() => this.onTileClicked(r, c)}/>)}
                    </div>)}
                </div>
                <div>
                    <div onClick={this.resetTiles}>
                        <BoardButton displayText="Reset"/>
                    </div>
                    <div onClick={this.displayJSON}>
                        <BoardButton displayText="To JSON"/>
                    </div>
                    <div onClick={this.promptJSON}>
                        <BoardButton displayText="Load JSON"/>
                    </div>
                </div>
            </div>
        );
    }

    private onTileClicked(x : number, y : number) {
        this.setState(s => ({
            tiles: this.toggleCell(s, y, x)
        }));
    }

    private getTiles = () => { 
        const elements = new Array<JSX.Element>();
        for (const tiles of this.state.jsxTiles){
            Array.prototype.push.apply(elements, tiles);
        }
        return elements;
    }

    private setBoardElements = () =>{
        const tileWidth = Math.floor(100 / this.state.width);
        const backgrounds = this.state.backgrounds;
        const jsxTiles = this.state.jsxTiles;
        const refs = this.state.refs;

        for (let y = 0; y < this.state.height; y++) {
            for (let x = 0; x < this.state.width; x++){
                const tileKey = x + " " + y;
                const dims = {x, y};
                backgrounds[y][x] = backgrounds[y][x] ? backgrounds[y][x] : defaultTileColor;
                jsxTiles[y][x] = (
                    <Tile 
                        ref={(tile) => refs[y][x] = tile!} 
                        key={tileKey} 
                        width={tileWidth} 
                        dimensions={dims} 
                        onClick={this.updateColorOfXY}
                        color={backgrounds[y][x]}
                    />
                );
            }
        }
        this.setState({backgrounds, jsxTiles, refs})
    }

    private resetTiles = () => {
        this.state.refs.forEach(row => row.forEach(tile => {
            if(!isNull(tile)){
                tile.reset();
            }
        }));
    }

    private createEmptyRows = <T extends object>(rowCount: number) => {
        const elements = new Array();
        for (let i = 0; i < rowCount; i++){
            elements[i] = new Array<T>();
        }
        return elements;
    }

    private updateColorOfXY = (color: IRgbColor, x: number, y: number) => {
        this.state.backgrounds[y][x] = {r: color.r, g: color.g, b: color.b};
    }


    private buildBoardFromJson = (colors: IRgbColor[][]) => {
        this.setState({
            width: colors[0].length,
            height: colors.length,
            backgrounds: colors,
            jsxTiles: this.createEmptyRows<JSX.Element>(colors.length),
            refs: this.createEmptyRows<Tile>(colors.length)
        },this.setBoardElements)
    }

    private displayJSON = () => alert(JSON.stringify(this.state.backgrounds));

    private promptJSON = () => {
        let loadedColors: IRgbColor[][];
        try {
            const jsonState = prompt('Insert JSON:');
            loadedColors = JSON.parse(jsonState ? jsonState : JSON.stringify(this.state.backgrounds));
            console.log(loadedColors);
            this.buildBoardFromJson(loadedColors);
        } catch (error) {
            console.error(error);
        }
    }

    private toggleCell(s: Readonly<IState>, y: number, x: number): boolean[][] {
        return s.tiles.map((row, r) => r !== y ? row : row.map((cell, c) => c !== x ? cell : !cell));
    }
}
