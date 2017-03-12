import { Dispatch } from 'redux';

import * as types from '../../constants/ActionTypes';
import * as authApi from '../../utils/api/auth';

function dispatchPreRequest(dispatch: Dispatch<any>) {
  dispatch({ type: types.REQUEST_WAIT });
}

function dispatchPostRequest(dispatch: Dispatch<any>) {
  dispatch({ type: types.REQUEST_COMPLETE });
}

export function login({ username, password }: { username: string, password: string }) {
  return async (dispatch: Dispatch<any>) => {
    dispatchPreRequest(dispatch);
    try {
      const data = await authApi.login(username, password);
      dispatch(Object.assign({ type: types.LOGIN_USER, ...data }));
    } catch (error) {
      console.error(error);
    } finally {
      dispatchPostRequest(dispatch);
    }
  };
}
