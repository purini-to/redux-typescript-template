import reducer from './error';
import { THROW_ERROR } from '../../constants/ActionTypes';
import Data from '../../constants/TestData';

declare var process: any;

const test = (action, state = {}) => reducer(state, action);

describe('Reducers', () => {
  describe('error', () => {
    it('エラー時にアラート表示できること', () => {
      const state = test({ type: THROW_ERROR });
      expect(state).toEqual({});
    });
  });
});
