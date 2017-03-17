import _ = require('lodash');
import * as ActionTypes from './ActionTypes';

describe('ActionTypes', () => {
  it('重複したActionが存在しないこと', () => {
    const arr = [
      ..._.values(ActionTypes)
    ];
    expect(arr).toEqual(_.uniq(arr));
  });
});
