import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import "./Register.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Register = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    // axios.get('http://localhost:8080/api/test-api').then(data => {
    //   console.log("data: ", data);
    // })
  }, []);

  const inValidInputs = () => {
    if(!email) {
      toast.error('Email is required!')
      return false
    }

    if(!phone) {
      toast.error('phone is required!')
      return false
    }

    if(!username) {
      toast.error('username is required!')
      return false
    }

    if(!password) {
      toast.error('password is required!')
      return false
    }

    if(password !== confirmPassword) {
      toast.error('your password is not the same!')
      return false
    }

    let re = /\S+@\S+\.\S+/;
  if(!re.test(email)) {
    toast.error('Please enter a valid email address')
    return false
  }
    return true;
  }

  const handleRegister = () => {
    let userData = {email, phone, username, password}
    let check = inValidInputs()
    console.log("userData: ", userData);
  }

  return (
    <div className="register-container">
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
            <div className="form-group">
              <label>Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address or phone number"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="phone number"
                type="text"
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Re-enter password"
                type="password"
              />
            </div>

            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
            <br />
            <div className="text-center">
              <button className="btn btn-success" onClick={handleLogin}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
