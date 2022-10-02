import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import logo from './img/logoSemFundo.png';


const Menu = () => {
  return (
    <Navbar sticky='top' expand="lg">
      <Navbar.Brand className="mx-3" href="/"><Image className="logo" src={logo}></Image></Navbar.Brand>
      <Navbar.Toggle className="bg-ligth" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Cadastros" id="basic-nav-dropdown" className="mr-4">
            <NavDropdown.Item href="/cadastroAnimais">Animais</NavDropdown.Item>
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

      <Navbar.Collapse className="justify-content-end">
        <Navbar.Brand className="mx-3" href="/"><Image className="logo" src="ds"></Image></Navbar.Brand>
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Menu;