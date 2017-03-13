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
      const res = await authApi.login(username, password);
      dispatch({ type: types.LOGIN_SUCCESS, user: res.data });
    } catch (e) {
      // 想定してないエラーの場合はすぐに終了
      if (!e.response || e.response.status !== 401) {
        return dispatch({ type: types.THROW_ERROR, e: e });
      }
      dispatch({ type: e.response.statusText.toUpperCase(), data: e.response });
    } finally {
      dispatchPostRequest(dispatch);
    }
  };
}
