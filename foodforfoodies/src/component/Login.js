import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import UID from "uniquebrowserid";

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [error, setError] = useState(false);
  var [errorMessages, setMessage] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    var uniquekey = new UID().completeID();
    const res = await fetch("http://localhost:5001/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, uniquekey }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      // window.alert("Invalid Credentials");
      setError(true);
      setMessage("username or password can't be empty ");
    } else if (res.status === 401 || !data) {
      setError(true);
      setMessage("invalid username or password");
    } else {
      props.onLogin();
      props.onCheck();
      history.push("/");
      history.push("/profile");
    }
  };
  return (
    <div style={{ marginTop: "150px" }} class="container">
      <div class="container-fluid">
        <div className="handle_login_form">
          <div class="row login_row_value main-content_login bg-success text-center">
            <div class="col-md-4 text-center company__info">
              <h3 class="company_title">
                Welcome
                <br /> Happy! To See You Back..
              </h3>
            </div>
            <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div class="container-fluid">
                <div class="row login_row_value">
                  <h2>Login</h2>
                </div>
                <div class="row login_row_value">
                  <form method="POST" class="form-group login_my_form">
                    <div class="row login_row_value">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        class="form__input"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div class="row login_row_value">
                      <input
                        type="text"
                        name="password"
                        id="password"
                        class="form__input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    {error ? (
                      <p style={{ textAlign: "left", color: "red" }}>
                        * {errorMessages}
                      </p>
                    ) : (
                      ""
                    )}
                    <div class="row login_row_value">
                      <input
                        type="submit"
                        name="login"
                        value="Login"
                        class="btn_login_form"
                        onClick={loginUser}
                      />
                    </div>
                  </form>
                </div>
                <div class="row login_row_value">
                  <p style={{ paddingBottom: "20px" }}>
                    Don't have an account?{" "}
                    <Link to="/signup">
                      <a>Register Here</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
