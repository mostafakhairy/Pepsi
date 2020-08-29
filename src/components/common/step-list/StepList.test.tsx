import React from 'react';
import StepList from './StepList';
import { mount } from 'enzyme';

test('Should have Login Title', () => {
  describe('Title should be login', () => {
    const wrapper = mount(<StepList steps={[]} title={'login'} />);
    const h2 = wrapper.find('.heading-1');
    expect(h2.text().toLowerCase()).toBe('login');
  });
});
test('Should Have Two Steps', () => {
  let steps = ['step1', 'step2'];
  const wrapper = mount(<StepList steps={steps} title={''} />);
  const ul = wrapper.find('ul');
  expect(ul.children().getElements().length).toBe(2);
});
