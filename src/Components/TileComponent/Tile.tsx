import * as React from 'react';
import './Tile.css';

interface IProps {
    width: number,
    color: IRgbColor,
    text: string
}

export interface IRgbColor{
    r: number,
    g: number,
    b: number
}

export const defaultTileColor = { r: 30, g: 144, b: 255 };

export const Tile: React.SFC<IProps> = (props: IProps) => (
    <div className="board-tile" style={buildTileStyle(props.color)}>
        {props.text}
    </div>
);
const buildTileStyle = (color: IRgbColor) => {
    const styles = {
        flex: `1 1 20px`,
        fontSize: "15%",
        backgroundColor: `rgb(${color.r},${color.g},${color.b})`  
    };
    return styles;
};


// const generateRandomRGBColor = (): IRgbColor => {
//     const red = generateIntegerFromClosedInterval(0, 255);
//     const green = generateIntegerFromClosedInterval(0, 255);
//     const blue = generateIntegerFromClosedInterval(0, 255);
//     return { r: red, g: green, b: blue };
// }

// const generateIntegerFromClosedInterval = (min: number, max: number): number => {
//     min = Math.ceil(min);
//     max = Math.floor(max) + 1;
//     const result = Math.random() * (max - min) + min;
//     return Math.floor(result);
// }

