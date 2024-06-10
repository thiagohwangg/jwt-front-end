import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";
import "./Nav.scss";
import { useEffect, useState } from "react";

const Nav = (props) => {
  const [isShow, setIsShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let session = JSON.parse(sessionStorage.getItem("account"));
    if (location.pathname === '/login') {
      setIsShow(false)
    }


  }, []);
  return (
    <>
      {isShow && (
        <div className="topnav">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/prjects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
