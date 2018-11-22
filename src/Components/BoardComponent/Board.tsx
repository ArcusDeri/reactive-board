import * as React from 'react';
import { Tile, defaultTileColor } from '../TileComponent/Tile';
import { BoardButton } from './BoardButtonComponent/BoardButton';
import './Board.css';

interface IProps {
    location: any
}

interface IState {
    tileClickStates: boolean[][];
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
            tileClickStates: this.createInitialClickStates(rowCount, columnCount)
        }
    }

    public createInitialClickStates = (rowCount: number, columnCount: number) => {
        const states: boolean[][] = [];
        for (let i = 0; i < rowCount; i++) {
            states.push([]);
            for (let j = 0; j < columnCount; j++) {
                states[i].push(false);
            }
        }
        return states;
    };

    public render () {
        console.log(this.state);
        return(
            <div className="board">
                <div className="tiles">
                    <Tile color={defaultTileColor} text="01" width={100}/>
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
