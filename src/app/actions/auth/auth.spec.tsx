import _ = require('lodash');
import { login } from './auth';

describe('Actions > auth > auth', () => {
  describe('login', () => {
    it('関数であること(非同期ActionCreator)', () => {
      expect(login({ username: 'username', password: 'password' })).toEqual(jasmine.any(Function));
    });
  });
});
