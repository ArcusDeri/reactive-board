import * as React from 'react';
import './Tile.css';

interface IProps {
    width: number,
    x: number,
    y: number
}

interface IState {
    hexBackgroundColor: string,
}

export class Tile extends React.Component<IProps, IState> {
    public render () {
        const tileStyle = {
            flex: `1 1 calc(${this.props.width}% - 10px)`,
            fontSize: this.props.width * 15 + "%"
        };
        return (
            <div className="board-tile" style={tileStyle} onClick={this.onTileClick}>
                {this.props.y}{this.props.x}
            </div>
        );
    }

    private onTileClick = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log(event.target);
    }
}