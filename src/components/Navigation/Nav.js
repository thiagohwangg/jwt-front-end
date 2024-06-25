import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";
import "./Nav.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Nav = (props) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (user.isAuthenticated || location.pathname === '/') {
    return (
      <>
        <div className="topnav">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </>
    );
  } else {
    return <></>
  }
};

export default Nav;
