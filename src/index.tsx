import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, Store } from 'react-redux';
import App from './app/containers/App';
import Login from './app/containers/login/Login';
import Talk from './app/containers/talk/Talk';
import configureStore from './app/store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { UserIsAuthenticated } from './app/utils/router/wrappers';

import './index.css';

const store: Store<any> = configureStore(browserHistory, {});
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login} />
        <Route path='talks' component={UserIsAuthenticated(Talk)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
