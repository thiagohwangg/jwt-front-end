import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Login.scss";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {loginUser} from "../../services/userService"
import { UserContext } from "../../context/UserContext";

const Login = (props) => {
  const {loginContext} = useContext(UserContext);

  const history = useHistory();
  const [valueLogin, setValueLogin] = useState("")
  const [password, setPassword] = useState("")
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidValuePassword: true
  }
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

  const handleCreateNewAccount = () => {
    history.push('/register')
  }


  const handleLogin = async() => {
    setObjValidInput(defaultObjValidInput)
    if(!valueLogin) {
      setObjValidInput({...defaultObjValidInput, isValidValueLogin: false})
      toast.error('Please enter your email address or phone number')
      return;
    }

    if(!password) {
      setObjValidInput({...defaultObjValidInput, isValidValuePassword: false})
      toast.error('Please enter your password')
      return;
    }

   let response = await loginUser(valueLogin, password)
   if(+response.EC === 0) {
    // success
    let groupWithRoles = response?.DT.groupWithRoles;
    let email = response?.DT.email;
    let username = response?.DT.username;
    let token = response?.DT.access_token
    let data = {
      isAuthenticated: true,
      token,
      account: {groupWithRoles, email, username}
    }
    localStorage.setItem("jwt", token);
    loginContext(data)

    history.push('/users')
    // window.location.reload();
   }

   if(+response?.EC !== 0) {
    // failed
    toast.error(response.EM)
   }
  }

  const handlePresEnter = (e) => {
    if(e.charCode === 13 && e.code === 'Enter') {
      handleLogin()
    }
  }
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Hoi dan it</div>
            <div className="detail">
              Thien Hoang helps you connect and share with the people in your
              life.
            </div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
          <div className="brand d-sm-none">Hoi dan it</div>
            
            <input
            value={valueLogin}
            onChange={(e) => setValueLogin(e.target.value)}
              className={objValidInput.isValidValueLogin ? "form-control" : "form-control is-invalid"}
              placeholder="Email address or phone number"
              type="text"
            />
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={objValidInput.isValidValuePassword ? "form-control" : "form-control is-invalid"}
              placeholder="Password"
              type="password"
              onKeyPress={(e) => handlePresEnter(e)}
            />
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            <span className="text-center">
              <a href="#" className="forgot-password">
                Forgot your password?
              </a>
            </span>
            <br />
            <div className="text-center">
              <button className="btn btn-success" onClick={handleCreateNewAccount}>Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
