import * as React from 'react';
import { BoardDimensionForm } from '../BoardDimensionFormComponent/BoardDimensionForm';
import './BoardSetup.css';

export class BoardSetup extends React.Component {
    public render(){
        return (
            <div className="board-setup">
                <h1>Setup</h1>
                <div className="setup-box">
                    <div className="form-group">
                        <h3>Board width:</h3>
                        <BoardDimensionForm handler={this.updateBoardXDimension} initialSize={2} />
                    </div>
                    <div className="form-group">
                        <h3>Board height:</h3>
                        <BoardDimensionForm handler={this.updateBoardYDimension} initialSize={2} />
                    </div>
                    <button className="go-button">Go</button>
                </div>
            </div>
        );
    }

    private updateBoardXDimension(dimension: number): void {
        console.log(dimension);
    }

    private updateBoardYDimension(dimension: number): void {
        console.log(dimension);
    }
}