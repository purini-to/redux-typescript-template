import { Map } from 'immutable';
import { REQUEST_WAIT, LOGIN_SUCCESS } from '../../constants/ActionTypes';
import Token from '../../models/account/AccessToken';

export default function auth(state: Token = new Token(), action: any): Token {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { id } = action.payload;
      Token.setAuthHeader(id);
      return state.clear().merge(action.payload) as Token;

    default:
      return state;
  }
}
