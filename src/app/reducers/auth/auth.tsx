import { REQUEST_WAIT, LOGIN_SUCCESS } from '../../constants/ActionTypes';
import Token from '../../models/account/AccessToken';

export default function auth(state: Token = new Token(), action: any): Token {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { id, ttl, userId } = action.user;
      Token.setAuthHeader(id);
      return state.set('id', id).set('ttl', ttl).set('userId', userId);

    default:
      return state;
  }
}
