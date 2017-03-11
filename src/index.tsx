import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider, Store} from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';
import {Router, Route, browserHistory} from 'react-router';

import 'todomvc-app-css/index.css';

const store: Store<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
