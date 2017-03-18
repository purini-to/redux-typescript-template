import _ = require('lodash');
import nock = require('nock');
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter = require('axios-mock-adapter');
import httpAdapter = require('axios/lib/adapters/http');

// 他にaxiosをロードされる前にアダプターをセットする
axios.defaults.adapter = httpAdapter;

import { api } from '../../utils/api/axios';
const mockAxios = new MockAdapter(api());


import { login } from './auth';
import * as types from '../../constants/ActionTypes';
import Common from '../../models/core/Common';
import Account from '../../models/account/Account';
import Token from '../../models/account/AccessToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions > auth > auth', () => {
  describe('login', () => {
    it('関数であること(非同期ActionCreator)', () => {
      expect(login({ username: 'username', password: 'password' })).toEqual(jasmine.any(Function));
    });

    it('ログイン成功したらユーザー情報を取得しトーク画面へ遷移すること', async (done) => {
      const token = { token: '123', ttl: 456, userId: 1 };
      const account = { id: 1, fulllname: 'abc' };

      // ログインAPIモック
      mockAxios.onPost('/accounts/login').reply(200, token);
      // ユーザー情報取得モック
      mockAxios.onGet('/accounts/1').reply(200, account);

      const expectedActions = [
        { type: types.REQUEST_WAIT },
        { type: types.LOGIN_SUCCESS, user: token },
        { type: types.SET_MY_ACCOUNT, user: account },
        { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/talks'] } },
        { type: types.REQUEST_COMPLETE },
      ];
      const store = mockStore({
        common: new Common(),
        auth: new Token().set('userId', 1),
        account: new Account()
      });

      await store.dispatch(login({ username: 'username', password: 'password' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
