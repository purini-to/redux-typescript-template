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
import Data from '../../constants/TestData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions', () => {
  describe('login', () => {
    afterEach(() => {
      mockAxios.reset();
    });

    it('関数であること(非同期ActionCreator)', () => {
      expect(login({ username: 'username', password: 'password' })).toEqual(jasmine.any(Function));
    });

    it('ログイン成功したらユーザー情報を取得しトーク画面へ遷移すること', async (done) => {
      const token = Data.Token.default;
      const account = Data.Account.default;

      // ログインAPIモック
      mockAxios.onPost('/accounts/login').reply(200, token);
      // ユーザー情報取得モック
      mockAxios.onGet('/accounts/1').reply(200, account);

      const expectedActions = [
        { type: types.REQUEST_WAIT },
        { type: types.LOGIN_SUCCESS, payload: token },
        { type: types.FETCH_MY_ACCOUNT, payload: account },
        { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/talks'] } },
        { type: types.REQUEST_COMPLETE },
      ];
      const store = mockStore({
        auth: new Token().set('userId', token.userId)
      });

      await store.dispatch(login({ username: 'username', password: 'password' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it(`ログイン失敗したら[${types.LOGIN_FAILED}]アクションが生成されること`, async (done) => {
      const error = { code: 'LOGIN_FAILED' };

      // ログインAPIモック
      mockAxios.onPost('/accounts/login').reply(401, { error: error });

      const expectedActions = [
        { type: types.REQUEST_WAIT },
        { type: types.LOGIN_FAILED, payload: { error: error } },
        { type: types.REQUEST_COMPLETE },
      ];
      const store = mockStore();

      await store.dispatch(login({ username: 'username', password: 'password' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it(`想定してないエラーの場合は[${types.THROW_ERROR}]アクションが生成されること`, async (done) => {
      const error = Data.Response['500'];

      // ログインAPIモック
      mockAxios.onPost('/accounts/login').reply(500, error);

      const expectedActions = [
        { type: types.REQUEST_WAIT },
        { type: types.THROW_ERROR, e: error },
        { type: types.REQUEST_COMPLETE },
      ];
      const store = mockStore();

      await store.dispatch(login({ username: 'username', password: 'password' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
