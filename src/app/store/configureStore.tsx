import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';
import createLogger = require('redux-logger');
const loggerMiddleware = (createLogger as any)();
import persistState = require('redux-localstorage');
import Token from '../models/account/AccessToken';

declare var module: any;
export default function configureStore(history: any, initialState: any) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history), loggerMiddleware),
      persistState('auth', getStorageConfig())
    )
  );
  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

function getStorageConfig() {
  return {
    key: 'auth',
    serialize: (store) => {
      return store && store.auth ?
        JSON.stringify(store.auth.toJS()) : store;
    },
    deserialize: (state) => {
      return { auth: state ? new Token(JSON.parse(state)) : new Token({}) };
    }
  };
}
