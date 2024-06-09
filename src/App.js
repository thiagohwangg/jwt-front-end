import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/ManageUsers/Users";
import { useEffect, useState } from "react";
import _ from "lodash";

function App() {
  const [account, setAccount] = useState({})
  console.log("account: ", account);

  useEffect(() => {
   let session = JSON.parse(sessionStorage.getItem('account'))
   console.log("session: ", session);
   if(session) {
    setAccount(session)
   }
  }, [])
  return (
    <Router>
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
        
        <Switch>
          <Route path="/news">News</Route>

          <Route path="/about">About</Route>

          <Route path="/contact">Contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/" exact>
            Home
          </Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
