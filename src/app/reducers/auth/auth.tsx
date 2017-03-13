import { REQUEST_WAIT, LOGIN_SUCCESS, UNAUTHORIZED } from '../../constants/ActionTypes';
import { assign } from '../../assign';
import msg from '../../constants/Messages';

import {setToken} from '../../utils/api/axios';

const initialState = {
  id: null,
  ttl: null,
  userId: null,
  errMsg: ''
};

export default function auth(state: any = initialState, action: any) {
  switch (action.type) {
    case REQUEST_WAIT:
      return assign(state, {errMsg: ''});

    case LOGIN_SUCCESS:
      setToken(action.user.id);
      return assign(state, action.user, {errMsg: ''});

    case UNAUTHORIZED:
      return assign(state, { errMsg: msg[UNAUTHORIZED] });

    default:
      return state;
  }
}
