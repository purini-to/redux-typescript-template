import * as types from '../../constants/ActionTypes';

export function login({ username, password }: { username: string, password: string }) {
  return { type: types.LOGIN_USER, username, password };
}
