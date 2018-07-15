import React from 'react';
import { mount } from 'enzyme';
import {
  NavItem,
  NavLink
} from 'reactstrap';

import NavBar from './NavBar';

describe('<NavBar />', () => {
  function onToggleFunc({}) {return {}};
  
  function NavItemProps() {
    return (
      <NavItem onClick={this.toggle}>
        <NavLink style={{ color: '#fff' }}>
          Login sebagai Tamu
        </NavLink>
      </NavItem>
    )
  }

  it('Component <NavBar /> and matches snapShot', () => {
    let NavBarProps = {
      onSetRegion: onToggleFunc,
      onRenderButtonAuth: NavItemProps
    };
    const wrapper = shallow(<NavBar {...NavBarProps} />)
    expect(wrapper).toMatchSnapshot();
  });

});