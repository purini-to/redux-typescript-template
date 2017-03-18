import reducer from './common';
import Common from '../../models/core/Common';
import { REQUEST_WAIT, REQUEST_COMPLETE, LOGIN_FAILED } from '../../constants/ActionTypes';
import Msg from '../../constants/Messages';
import Data from '../../constants/TestData';

declare var process: any;

const test = (action, state = new Common()) => reducer(state, action);

describe('Reducers', () => {
  describe('common', () => {
    it('リクエスト中のフラグをTrueに設定しメッセージをクリアできること', () => {
      const state = test({ type: REQUEST_WAIT });
      expect(state).toEqual(new Common().merge({ wait: true, msg: '' }));
    });

    it('リクエスト中のフラグをFalseにし他の設定には影響がないこと', () => {
      const common = new Common().merge({ wait: true, msg: 'test' }) as Common;
      const state = test({ type: REQUEST_COMPLETE }, common);
      expect(state).toEqual(common.set('wait', false));
    });

    it('ログイン失敗時はエラーメッセージが設定できること', () => {
      const state = test({ type: LOGIN_FAILED });
      expect(state).toEqual(new Common().set('msg', Msg[LOGIN_FAILED]));
    });
  });
});
