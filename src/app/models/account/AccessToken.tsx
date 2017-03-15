import { Record } from 'immutable';
import { setToken } from '../../utils/api/axios';

const TokenRecord = Record({
  id: '' as string,
  ttl: null as number,
  userId: null as number,
  created: null as Date
});

export default class Token extends TokenRecord {
  static setAuthHeader(id: string) {
    setToken(id);
  }
};
