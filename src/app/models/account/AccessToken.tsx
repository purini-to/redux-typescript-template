import { Record } from 'immutable';
import { api, setToken } from '../../utils/api/axios';
import { login } from '../../utils/api/auth';

const TokenRecord = Record({
  id: '' as string,
  ttl: null as number,
  userId: null as number
});

export default class Token extends TokenRecord {
  static setAuthHeader(id: string) {
    setToken(id);
  }
};
