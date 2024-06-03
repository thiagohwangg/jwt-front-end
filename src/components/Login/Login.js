import "./Login.scss";

const Login = (props) => {
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
            <span className="text-center">
              <a href="#" className="forgot-password">
                Forgot your password?
              </a>
            </span>
            <br />
            <div className="text-center">
              <button className="btn btn-success">Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
