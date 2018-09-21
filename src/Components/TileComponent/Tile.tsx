import * as React from 'react';
import './Tile.css';

interface IProps {
    width: number,
    x: number,
    y: number
}

interface IState {
    backgroundColor: IRgbColor
}

interface IRgbColor{
    r: number,
    g: number,
    b: number
}

export class Tile extends React.Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        const tileColor: IRgbColor = {
            r: 30,
            g: 144,
            b: 255
        };
        this.state = {
            backgroundColor: tileColor
        };
    }

    public render () {
        const tileColor = this.state.backgroundColor; 
        const tileStyle = {
            flex: `1 1 calc(${this.props.width}% - 10px)`,
            fontSize: this.props.width * 15 + "%",
            backgroundColor: `rgb(${tileColor.r},${tileColor.g},${tileColor.b})`
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