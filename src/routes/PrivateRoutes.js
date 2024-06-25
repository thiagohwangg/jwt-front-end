import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  console.log("user: ", user);

  if (user.isAuthenticated) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};

export default PrivateRoutes;
