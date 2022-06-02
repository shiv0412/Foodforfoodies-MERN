import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UID from "uniquebrowserid";
import { RiEBike2Fill } from "react-icons/ri";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [error, setError] = useState(false);
  var [errorMessages, setMessage] = useState("");

  const loginDboy = async (e) => {
    e.preventDefault();
    var uniquekey = new UID().completeID();
    const res = await fetch("http://localhost:5001/deliverypersonlogin", {
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
      // props.onLogin();
      history.push("/");
    }
  };
  return (
    <div class="container-fluid back_login_holder">
      <div class="handle_login_form">
        <div className="login_form_handle_two">
          <div
            class="row login_row_value main-content_login bg-success text-center"
            style={{ boxShadow: "1px 1px 12px 2px #566573" }}
          >
            <div class="col-md-4 text-center company__info">
              <h3 class="company_title">FoodForFoodies</h3>
              <RiEBike2Fill className="admin_logo_login"></RiEBike2Fill>
            </div>
            <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div class="container-fluid">
                <div class="row login_row_value">
                  <h1 style={{ textShadow: "2px 2px 5px #808B96" }}>Login</h1>
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
                    <div
                      class="row login_row_value"
                      style={{ padding: "20px 0px 50px 0px" }}
                    >
                      <input
                        type="submit"
                        name="login"
                        value="Login"
                        class="btn_login_form"
                        onClick={loginDboy}
                      />
                    </div>
                  </form>
                </div>
                <div class="row login_row_value">
                  {/* <p style={{ paddingBottom: "20px" }}>
                    Don't have an account?
                    <a>Register Here</a>
                  </p> */}
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
