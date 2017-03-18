import { UserAuthWrapper } from 'redux-auth-wrapper';
import { replace } from 'react-router-redux';
import * as accountApi from '../../utils/api/account';
import * as types from '../../constants/ActionTypes';
import Token from '../../models/account/AccessToken';

const UserIsAuthenticated = UserAuthWrapper({
  // number型を返すと型エラーとなる為インスタンスオブジェクトを返す
  // どうやらobject型でないとダメみたい
  authSelector: state => (state.account.id) ? state.account : null,
  authenticatingSelector: state => state.account.id,
  redirectAction: newLoc => async (dispatch, getState) => {
    // トークンを利用して自身の情報を取得する
    const auth: Token = getState().auth;
    if (!auth || !auth.userId) {
      return dispatch(replace(newLoc));
    }

    try {
      const id = auth.id;
      const userId = auth.userId;

      Token.setAuthHeader(id);
      const resAccount = await accountApi.getId(userId);
      dispatch({ type: types.FETCH_MY_ACCOUNT, payload: resAccount.data });
    } catch (e) {
      dispatch(replace(newLoc));
    }
  },
  wrapperDisplayName: 'UserIsAuthenticated'
});

export const Authenticated = UserIsAuthenticated((props) => props.children);
