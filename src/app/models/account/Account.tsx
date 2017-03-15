import { Record } from 'immutable';

const AccountRecord = Record({
  id: null as number,
  username: '' as string,
  firstname: '' as string,
  lastname: '' as string,
  createdAt: null as Date,
  updatedAt: null as Date
});

export default class Account extends AccountRecord {
};
