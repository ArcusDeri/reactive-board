import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoardSetup } from './Components/BoardSetupComponent/BoardSetup';
import { Header } from './Components/HeaderComponent/Header';
import { Board } from './Components/BoardComponent/Board';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header/>
      <div className="application-content">
        <Switch>
          <Route path="/" exact={true} component={BoardSetup} />
          <Route path="/board" component={Board} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
