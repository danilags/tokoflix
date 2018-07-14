import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NavBar = (props) => (
  <Navbar style={styles.container} light expand="md">
    <NavbarBrand style={{ color: '#fff' }} href="/">TokoFlix</NavbarBrand>
    <NavbarToggler onClick={() => null } />
    <Collapse isOpen={false} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink onClick={() => props.onSetRegion('ID')} style={{ color: '#fff' }}>Indonesia</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => props.onSetRegion('US')} style={{ color: '#fff' }}>Amerika</NavLink>
        </NavItem>
        {props.onRenderButtonAuth()}
      </Nav>
    </Collapse>
  </Navbar>
);

const styles = {
  container: {
    background: '#42b549', 
    position: 'fixed', 
    top: 0,
    zIndex: 20,
    width: '100%'
  }
}

export default NavBar;
