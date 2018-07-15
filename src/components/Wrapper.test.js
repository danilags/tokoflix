/**
 * Testing Wrapper component
 */

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Wrapper from './Wrapper';

describe('<Wrapper />', () => {
  it('Component renders and matches snapShot', () => {
    let child = [
      <h3>Child 1</h3>,
      <p>Child 2</p>
    ];
    const wrapper = shallow(<Wrapper {...child} />)
    expect(wrapper).toMatchSnapshot();
  });

  it('test Wrapper matches MOUNT', () => {
    let inst = renderer.create(React.createElement('div', <Wrapper />));
    expect(inst.toJSON()).toMatchSnapshot();
  });
})
