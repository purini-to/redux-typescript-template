import { LOGIN_USER } from '../../constants/ActionTypes';
import { assign } from '../../assign';

const initialState = {
  token: null,
  ttl: null
};

export default function todos(state: any = initialState, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      console.log(action);
      return state;

    default:
      return state;
  }
}