import {
  Link,
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom";
import "./NavHeader.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const handleLogout = async () => {
    let data = await logoutUser(); // clear cookie
    localStorage.removeItem("jwt") // clear localStorage
    logoutContext() // clear user in context
    if (+data?.EC === 0) {
      toast.success('Logout succeeds...')
      history.push("/login");
    } else {
      toast.error(data?.EM)
    }
  };
  if (user.isAuthenticated || location.pathname === "/" || location.pathname === "/about") {
    return (
      <>
        <div className="nav-header">
          <Navbar bg="header" expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand>
                <Link to="/">
                <img
                  src="../../../favicon.ico"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                
                </Link>
                <span className="brand-name">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className={"nav-link"}>
                    Home
                  </NavLink>
                  <NavLink to="/users" className={"nav-link"}>
                    Users
                  </NavLink>
                  <NavLink to="/roles" className={"nav-link"}>
                    Roles
                  </NavLink>
                  <NavLink to="/group-role" className={"nav-link"}>
                    Group Role
                  </NavLink>
                  <NavLink to="/projects" className={"nav-link"}>
                    Projects
                  </NavLink>
                  <NavLink to="/about" className={"nav-link"}>
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user?.isAuthenticated ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcom {user?.account.username}
                      </Nav.Item>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change password</NavDropdown.Item>
                        <NavDropdown.Item>
                          <span onClick={handleLogout}>Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
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
