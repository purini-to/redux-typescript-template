import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import common from './core/common';
import auth from './auth/auth';
import account from './account/account';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  common,
  auth,
  account
});

export default rootReducer;
