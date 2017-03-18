import { REQUEST_WAIT, REQUEST_COMPLETE, LOGIN_FAILED } from '../../constants/ActionTypes';
import Common from '../../models/core/Common';
import msg from '../../constants/Messages';

export default function request(state: Common = new Common(), action: any): Common {
  switch (action.type) {
    case REQUEST_WAIT:
      return state.merge({ wait: true, msg: '' }) as Common;

    case REQUEST_COMPLETE:
      return state.set('wait', false) as Common;

    case LOGIN_FAILED:
      return state.set('msg', msg[LOGIN_FAILED]) as Common;

    default:
      return state;
  }
}
