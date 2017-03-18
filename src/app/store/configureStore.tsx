import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';
import persistState = require('redux-localstorage');
import Token from '../models/account/AccessToken';

declare var process: any;
declare var module: any;

export default function configureStore(history: any, initialState: any) {
  let middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');
    const loggerMiddleware = (createLogger as any)();
    middleware = [...middleware, loggerMiddleware];
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
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
