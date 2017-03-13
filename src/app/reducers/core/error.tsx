import { THROW_ERROR } from '../../constants/ActionTypes';
import { assign } from '../../assign';
import msg from '../../constants/Messages';

const initialState = {};

export default function request(state: any = initialState, action: any) {
  switch (action.type) {
    case THROW_ERROR:
      alert(msg[THROW_ERROR]);
      return state;

    default:
      return state;
  }
}
