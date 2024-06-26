import { createContext, useEffect, useState } from "react";
import {getUserAccount} from "../services/userService"
const UserContext = createContext(null);
const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  }
  const [user, setUser] = useState(userDefault);

  useEffect(() => {
    if(window.location.pathname !== '/' || window.location.pathname !== '/login') {
      fetchUser()
    }
  }, [])

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({...userData, isLoading: false});
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  const fetchUser = async() => {
    let response = await getUserAccount();
    if(response.EC === 0) {
      let groupWithRoles = response?.DT.groupWithRoles;
    let email = response?.DT.email;
    let username = response?.DT.username;
    let token = response?.DT.access_token
    let data = {
      isAuthenticated: true,
      token,
      account: {groupWithRoles, email, username},
      isLoading: false
    }
      setUser(data)
    } else {
      setUser({...userDefault, isLoading: false})
    }
  }

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
