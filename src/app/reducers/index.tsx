import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import request from './core/request';
import auth from './auth/auth';

const rootReducer = combineReducers({
  form: formReducer,
  request,
  auth
});

export default rootReducer;
