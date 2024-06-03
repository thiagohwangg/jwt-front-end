import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Register.scss";

const Register = (props) => {
  const history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
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
                className="form-control"
                placeholder="Email address or phone number"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                className="form-control"
                placeholder="phone number"
                type="text"
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                className="form-control"
                placeholder="Re-enter password"
                type="password"
              />
            </div>

            <button className="btn btn-primary">Register</button>
            <br />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={handleLogin}
              >
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
