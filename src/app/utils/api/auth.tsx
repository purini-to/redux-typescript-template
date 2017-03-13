import { api } from './axios';

export function login(username: string, password: string) {
  return api().post('accounts/login', {
    username: username,
    password: password
  });
}
