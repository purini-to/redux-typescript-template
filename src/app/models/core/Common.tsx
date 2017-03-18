import { Record } from 'immutable';

const CommonRecord = Record({
  wait: false as boolean,
  msg: '' as string
});

export default class Common extends CommonRecord {
  wait: boolean;
  msg: string;
};
