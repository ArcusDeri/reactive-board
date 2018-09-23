import * as React from 'react';
import './BoardButton.css';

interface IProps {
  displayText: string
}

export const BoardButton: React.SFC<IProps> = (props: IProps) => <button id="boardButton">{props.displayText}</button>;
