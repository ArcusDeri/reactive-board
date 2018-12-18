import * as React from 'react';
import IRgbColor from '../../Model/IRgbColor';
import './Tile.css';

interface IProps {
    width: number,
    color: IRgbColor,
    text: string
}

export const defaultTileColor = { r: 30, g: 144, b: 255 };

export const Tile: React.SFC<IProps> = (props: IProps) => (
    <div className="board-tile" style={buildTileStyle(props.color, props.width)}>
        {props.text}
    </div>
);
const buildTileStyle = (color: IRgbColor, basis: number) => {
    const styles = {
        flexBasis: basis + "%",
        fontSize: "1.5em",
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

