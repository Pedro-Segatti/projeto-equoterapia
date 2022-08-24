import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Menu = () => {
  return (
    <Navbar sticky='top' expand="lg">
      <Navbar.Brand className="mx-3" href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle className="bg-ligth" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Cadastros" id="basic-nav-dropdown" className="mr-4">
            <NavDropdown.Item href="#action/3.1">Pacientes</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Funcionarios</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">....</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Movimentos" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Pacientes</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Funcionarios</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">....</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Consultas" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Pacientes</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Funcionarios</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">....</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Relatórios" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Pacientes</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Funcionarios</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">....</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Menu;