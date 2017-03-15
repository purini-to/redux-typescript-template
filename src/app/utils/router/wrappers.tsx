import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const UserIsAuthenticated = UserAuthWrapper({
  // number型を返すと型エラーとなる為インスタンスオブジェクトを返す
  // どうやらobject型でないとダメみたい
  authSelector: state => (state.account.get('id')) ? state.account : null,
  authenticatingSelector: state => state.account.get('id'),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});
