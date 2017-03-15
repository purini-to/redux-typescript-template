import { api } from './axios';

export function getId(id: number) {
  return api().get(`accounts/${id}`);
}
