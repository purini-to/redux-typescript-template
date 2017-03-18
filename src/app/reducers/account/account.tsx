import { SET_MY_ACCOUNT } from '../../constants/ActionTypes';
import Account from '../../models/account/Account';

export default function auth(state: Account = new Account(), action: any): Account {
  switch (action.type) {
    case SET_MY_ACCOUNT:
      return state.clear().merge(action.user) as Account;

    default:
      return state;
  }
}
