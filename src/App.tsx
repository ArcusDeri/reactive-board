import * as React from 'react';
import { Header } from './Components/HeaderComponent/Header';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
          <Header/>
      </div>
    );
  }
}

export default App;
