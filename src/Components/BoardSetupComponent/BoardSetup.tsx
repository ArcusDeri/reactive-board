import * as React from 'react';
import { BoardDimensionForm } from '../BoardDimensionFormComponent/BoardDimensionForm';
import './BoardSetup.css';

export class BoardSetup extends React.Component {
    public render(){
        return (
            <div className="board-setup">
                <h1>Setup</h1>
                <BoardDimensionForm handler={this.updateBoardXDimension} initialSize={2} />
            </div>
        );
    }

    private updateBoardXDimension(dimension: number): void {
        console.log(dimension);
    }
}