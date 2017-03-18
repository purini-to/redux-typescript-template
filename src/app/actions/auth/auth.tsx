import { Dispatch } from 'redux';
import { push } from 'react-router-redux';

import Token from '../../models/account/AccessToken';
import * as types from '../../constants/ActionTypes';
import * as authApi from '../../utils/api/auth';
import * as accountApi from '../../utils/api/account';

function dispatchPreRequest(dispatch: Dispatch<any>) {
  dispatch({ type: types.REQUEST_WAIT });
}

function dispatchPostRequest(dispatch: Dispatch<any>) {
  dispatch({ type: types.REQUEST_COMPLETE });
}

export function login({ username, password }: { username: string, password: string }) {
  return async (dispatch: Dispatch<any>, getState: any) => {
    dispatchPreRequest(dispatch);
    try {
      // ログイン処理を行う
      const res = await authApi.login(username, password);
      await dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
      // トークンを利用して自身の情報を取得する
      const auth: Token = getState().auth;
      const resAccount = await accountApi.getId(auth.userId);
      await dispatch({ type: types.FETCH_MY_ACCOUNT, payload: resAccount.data });
      // トーク画面へ移動する
      dispatch(push('/talks'));
    } catch (e) {
      // 想定してないエラーの場合はすぐに終了
      if (!e.response || e.response.status !== 401) {
        return dispatch({ type: types.THROW_ERROR, e: e });
      }
      dispatch({ type: e.response.data.error.code.toUpperCase(), payload: e.response.data });
    } finally {
      dispatchPostRequest(dispatch);
    }
  };
}
