import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

const settings = {
  baseURL: 'http://localhost:9000/api/',
  timeout: 10000
};
let instance = axios.create(settings);

export function api() {
  return instance;
};

export function setToken(token: string) {
  instance = axios.create(Object.assign({
    headers: { 'Authorization': token }
  }, settings));
}
