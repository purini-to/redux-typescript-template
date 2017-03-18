import reducer from './account';
import Account from '../../models/account/Account';
import { FETCH_MY_ACCOUNT } from '../../constants/ActionTypes';
import Data from '../../constants/TestData';

declare var process: any;

const test = (action, state = new Account()) => reducer(state, action);

describe('Reducers', () => {
  describe('account', () => {
    it('アカウント情報を保存できること', () => {
      const account = Data.Account.default;
      const state = test({ type: FETCH_MY_ACCOUNT, payload: account });
      expect(state).toEqual(new Account().merge(account));
    });
  });
});
