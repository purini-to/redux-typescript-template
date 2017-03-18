import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';

import Cover from './Cover';
import { subTitle } from './Cover.css';

function setup(propOverrides = {}) {
  const props = {
    title: 'title',
    subTitle: 'subTitle',
    ...propOverrides
  };

  let output = mount(
    <Cover {...props} />
  );

  return {
    props,
    output
  };
}

describe('Components', () => {
  describe('Cover', () => {
    it('タイトルとサブタイトルがプロパティ通り描画されること', () => {
      const { props, output } = setup();
      expect(output.find('h1').node.textContent).toBe(props.title);
      expect(output.find('h3').node.textContent).toBe(props.subTitle);
    });

    it('サブタイトルがない場合は<h3>タグが描画されないこと', () => {
      const { props, output } = setup({ subTitle: '' });
      expect(output.find('h1').node.textContent).toBe(props.title);
      expect(output.find('h3').nodes).toEqual([]);
    });
  });
});