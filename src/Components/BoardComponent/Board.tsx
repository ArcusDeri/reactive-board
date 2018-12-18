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

    constructor (props: IProps) {
        super(props);
        const columnCountFromProps = props.location.state.columnCount;
        const rowCountFromProps = props.location.state.rowCount;
        const columnCount = columnCountFromProps ? columnCountFromProps : this.defaultColumnCount;
        const rowCount = rowCountFromProps ? rowCountFromProps : this.defaultRowCount;
        
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
        console.log(this.state);
        return(
            <div className="board">
                <div className="tiles">
                    {this.state.tileColorMatrix.map((colorsRow, keyY) =>
                        colorsRow.map((color, keyX) => {
                            const key = `${keyY}${keyX}`;
                            return <Tile color={color} key={key} text={key} width={Math.floor(100/this.state.columnCount)-1}/>
                        })
                    )}
                </div>
                <div>
                    <div>
                        <BoardButton displayText="Reset"/>
                    </div>
                    <div>
                        <BoardButton displayText="To JSON"/>
                    </div>
                    <div>
                        <BoardButton displayText="Load JSON"/>
                    </div>
                </div>
            </div>
        );
    }
}
