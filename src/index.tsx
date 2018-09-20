import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoardSetup } from './Components/BoardSetupComponent/BoardSetup';
import { Header } from './Components/HeaderComponent/Header';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path="/" exact={true} component={BoardSetup} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
