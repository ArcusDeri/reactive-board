import * as React from 'react';
import { BoardDimensionForm } from '../BoardDimensionFormComponent/BoardDimensionForm';
import './BoardSetup.css';

interface IState {
    width: number,
    height: number
}

export class BoardSetup extends React.Component<{}, IState> {
    public componentDidMount () {
        this.state = {
            width: 3,
            height: 3
        };
    }

    public render () {
        return (
            <div className="board-setup">
                <h1>Setup</h1>
                <div className="setup-box">
                    <div className="form-group">
                        <h3>Board width:</h3>
                        <BoardDimensionForm handler={this.updateBoardXDimension} initialSize={3} />
                    </div>
                    <div className="form-group">
                        <h3>Board height:</h3>
                        <BoardDimensionForm handler={this.updateBoardYDimension} initialSize={3} />
                    </div>
                    <button className="go-button">Go</button>
                </div>
            </div>
        );
    }

    private updateBoardXDimension = (dimension: number): void => this.setState({width: dimension});

    private updateBoardYDimension = (dimension: number): void => this.setState({height: dimension});
}