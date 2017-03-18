import reducer from './auth';
import Token from '../../models/account/AccessToken';
import { LOGIN_SUCCESS } from '../../constants/ActionTypes';
import { api } from '../../utils/api/axios';
import Data from '../../constants/TestData';

declare var process: any;

const test = (action, state = new Token()) => reducer(state, action);

describe('Reducers', () => {
  describe('auth', () => {
    it('ログイン成功時にトークンを保存してリクエストヘッダーにトークンを設定すること', () => {
      const token = Data.Token.default;
      const state = test({ type: LOGIN_SUCCESS, payload: token });
      expect(state).toEqual(new Token().merge(token));
      expect(api().defaults.headers[process.env.APP_API_HEADER_AUTH]).toBe(token.id);
    });
  });
});
