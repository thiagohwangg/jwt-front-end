import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";
import "./NavHeader.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const NavHeader = (props) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (user.isAuthenticated || location.pathname === "/") {
    return (
      <>
        <div className="nav-header">
          <Navbar bg="header" expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">
              <img
              src="../../../favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
                <span className="brand-name">React</span>
                </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className={"nav-link"}>
                    Home
                  </NavLink>
                  <NavLink to="/users" className={"nav-link"} >Users</NavLink>
                  <NavLink to="/projects" className={"nav-link"} >Projects</NavLink>
                  <NavLink to="/about" className={"nav-link"} >About</NavLink>
                </Nav>
                <Nav>
                  <Nav.Item className="nav-link">Welcom Thiago</Nav.Item>
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Change password
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
