import React, { Component } from 'react'
import farmer from '../farmer.png'
// import {Nav,Navbar,NavDropdown,NavLink, NavbarBrand, NavbarCollapse} from 'react-bootstrap';
import {Nav, Navbar, NavDropdown }  from 'react-bootstrap'

class Navigation extends Component {

  render() {
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Karma Coin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Account</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Navigation;