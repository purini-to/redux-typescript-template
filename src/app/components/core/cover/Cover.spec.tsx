import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Cover from './Cover';
import { assign } from '../../../assign';

function setup(propOverrides: object = {}) {
  const props = assign({
    title: 'Title',
    subTitle: 'SubTitle'
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<Cover {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('Cover', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.type).toBe('div');
    });
  });
});
