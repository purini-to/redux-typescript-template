import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import common from './core/common';
import auth from './auth/auth';

const rootReducer = combineReducers({
  form: formReducer,
  common,
  auth
});

export default rootReducer;
