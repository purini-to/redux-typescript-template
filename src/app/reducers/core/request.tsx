import { REQUEST_WAIT, REQUEST_COMPLETE } from '../../constants/ActionTypes';
import { assign } from '../../assign';

const initialState = {
  wait: false as boolean
};

export default function request(state: any = initialState, action: any) {
  switch (action.type) {
    case REQUEST_WAIT:
      return { wait: true };

    case REQUEST_COMPLETE:
      return { wait: false };

    default:
      return state;
  }
}
