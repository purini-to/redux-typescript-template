import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

declare var process: any;

const settings = {
  baseURL: process.env.APP_API_URL,
  timeout: Number(process.env.APP_API_TIMEOUT_MS)
};
let instance = axios.create(settings);

export function api() {
  return instance;
};

export function setToken(token: string) {
  instance = axios.create(Object.assign({
    headers: { [process.env.APP_API_HEADER_AUTH]: token }
  }, settings));
}
