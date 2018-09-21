import * as React from 'react';

interface IProps {
    location: IPropsLocation
}

interface IState {
    width: number,
    height: number
}

interface IPropsLocation {
    state?: IState
}

export class Board extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = props.location.state ? props.location.state : {width: 3, height: 3};
    }

    public render () {
        return(
            <div className="board-container">
                {this.state.height}
                {this.state.width}
            </div>
        );
    }
}