import "./Login.scss";

const Login = (props) => {
  return (
    <div className="login-container mt-3">
      <div className="container">
        <div className="row">
          <div className="content-left col-md-7">
            <div className="brand">Hoi dan it</div>
            <div className="detail">
              Thien Hoang helps you connect and share with the people in your
              life.
            </div>
          </div>
          <div className="content-right col-md-5 green d-flex flex-column gap-3 py-3">
            <input
              className="form-control"
              placeholder="Email address or phone number"
              type="text"
            />
            <input
              className="form-control"
              placeholder="Password"
              type="password"
            />
            <button className="btn btn-primary">Login</button>
            <span className="text-center">Forgot your password?</span>
            <br />
            <div className="text-center">
              <button className="btn btn-success">
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
