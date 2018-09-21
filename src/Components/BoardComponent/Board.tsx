import * as React from 'react';

interface IProps {
    location: IPropsLocation
}

interface IState {
    width: number,
    height: number
}

interface IPropsLocation {
    state: IState
}

export class Board extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = props.location.state;
    }

    public render () {
        return(
            <div>
                <h1>wow</h1>
                <h2>{this.state.width}</h2>
                <h2>{this.state.height}</h2>
            </div>
        );
    }
}