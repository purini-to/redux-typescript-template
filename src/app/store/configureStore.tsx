import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers/index';
import createLogger = require('redux-logger');
const loggerMiddleware = (createLogger as any)();

declare var module: any;
export default function configureStore(history: any, initialState: any) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, routerMiddleware(history), loggerMiddleware)
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
