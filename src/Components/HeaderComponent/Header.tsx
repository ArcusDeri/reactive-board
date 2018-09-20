import * as React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; 

export const Header: React.SFC<{}> = () => (
    <header>
        <Link to="/"><h1>Reactive Board</h1></Link>
    </header>
);