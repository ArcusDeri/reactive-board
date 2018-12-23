import * as React from 'react';
import { Tile, defaultTileColor } from '../TileComponent/Tile';
import { BoardButton } from './BoardButtonComponent/BoardButton';
import IRgbColor from '../../Model/IRgbColor';
import './Board.css';

interface IProps {
    location: any
}

interface IState {
    tileColorMatrix: IRgbColor[][];
    columnCount: number,
    rowCount: number
}

export class Board extends React.Component<IProps, IState> {
    private defaultColumnCount = 3;
    private defaultRowCount = 3;
    private timeouts: any[][];

    constructor (props: IProps) {
        super(props);
        const columnCountFromProps = props.location.state.columnCount;
        const rowCountFromProps = props.location.state.rowCount;
        const columnCount = columnCountFromProps ? columnCountFromProps : this.defaultColumnCount;
        const rowCount = rowCountFromProps ? rowCountFromProps : this.defaultRowCount;
        this.timeouts = new Array(rowCount).fill(null).map(x => new Array(columnCount).fill(null));

        this.state = {
            columnCount,
            rowCount,
            tileColorMatrix: this.createInitialColorsMatrix(rowCount, columnCount)
        }
    }

    public createInitialColorsMatrix = (rowCount: number, columnCount: number): IRgbColor[][] => {
        const states: IRgbColor[][] = [];
        for (let i = 0; i < rowCount; i++) {
            states.push([]);
            for (let j = 0; j < columnCount; j++) {
                states[i].push(defaultTileColor);
            }
        }
        return states;
    };

    public render () {
        return(
            <div className="board">
                <div className="tiles">
                    {this.state.tileColorMatrix.map((colorsRow, keyY) =>
                        colorsRow.map((color, keyX) => {
                            const key = `${keyY}${keyX}`;
                            return (
                                <Tile 
                                    color={color}
                                    key={key} 
                                    text={key} 
                                    width={Math.floor(100/this.state.columnCount)-1}
                                    onClick={this.onTileClick.bind(this, keyX, keyY)}
                                />)
                        })
                    )}
                </div>
                <div>
                    <div onClick={this.resetAllTiles}>
                        <BoardButton displayText="Reset"/>
                    </div>
                    <div onClick={this.displayColorsJson}>
                        <BoardButton displayText="To JSON"/>
                    </div>
                    <div onClick={this.setColorsFromJson}>
                        <BoardButton displayText="Load JSON"/>
                    </div>
                </div>
            </div>
        );
    }

    private onTileClick = (x: number, y: number)=> {
        const matrix = this.cloneColorMatrix();
        const newColor = this.generateIRgbColor();
        matrix[y][x] = newColor;
        this.setState({
            tileColorMatrix: matrix
        })
        this.resetAtXYDelayed(x, y);
    };

    private cloneColorMatrix = (): IRgbColor[][] => {
        const colorsObject = Object.assign({}, this.state.tileColorMatrix);
        return Object.keys(colorsObject).map(key => colorsObject[key]);
    };

    private resetAtXYDelayed = (x: number, y: number): void => {
        clearTimeout(this.timeouts[y][x])
        this.timeouts[y][x] = setTimeout(() => {
            const matrix = this.cloneColorMatrix();
            matrix[y][x] = defaultTileColor;
            this.setState({
                tileColorMatrix: matrix
            });
        }, 2000);
    };

    private resetAllTiles = (): void => {
        this.setState({
            tileColorMatrix: this.createInitialColorsMatrix(this.state.rowCount, this.state.columnCount)
        })
    };

    private displayColorsJson = (): void => {
        const json = JSON.stringify(this.state.tileColorMatrix);
        alert(json);
    };

    private setColorsFromJson = (): void => {
        const matrixString = prompt("Insert json color matrix: ");
        if (!matrixString) {
            return;
        }
        const matrix = JSON.parse(matrixString);
        this.timeouts.forEach(y => y.forEach(x => clearTimeout(x)));
        this.setState({
            tileColorMatrix: matrix
        })
    };

    private generateIRgbColor = (): IRgbColor => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return {r, g, b};
    };
}
