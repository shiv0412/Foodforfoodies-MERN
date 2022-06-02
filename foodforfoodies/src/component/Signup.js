import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function SignUp(props) {
  const history = useHistory();
  var [error, setError] = useState(false);
  var [errorMessages, setMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = user;
    const res = await fetch("http://localhost:5001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      setError(true);
      setMessage("user registration fields can't be empty ");
    } else if (res.status === 423 || !data) {
      setError(true);
      setMessage("email already exists");
    } else if (res.status === 424 || !data) {
      setError(true);
      setMessage("username already exists");
    } else if (res.status === 428 || !data) {
      setError(true);
      setMessage("Phone number not in proper format");
    } else if (res.status === 451 || !data) {
      setError(true);
      setMessage("Email not in proper format");
    } else {
      props.onSignup();
      history.push("/login");
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
                <br /> Happy! To See You..
              </h3>
            </div>
            <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div class="container-fluid">
                <div class="row login_row_value">
                  <h2>Register</h2>
                </div>
                <div class="row login_row_value">
                  <form method="POST" class="form-group login_my_form">
                    <div class="row login_row_value">
                      <p
                        style={{
                          margin: "0",
                          textAlign: "left",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        * Required
                      </p>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="form__input"
                        placeholder="Username"
                        value={user.name}
                        onChange={handleInputs}
                      />
                    </div>
                    <div class="row login_row_value">
                      <p
                        style={{
                          margin: "0",
                          textAlign: "left",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        * Required
                      </p>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        class="form__input"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleInputs}
                      />
                    </div>
                    <div class="row login_row_value">
                      <p
                        style={{
                          margin: "0",
                          textAlign: "left",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        * Required
                      </p>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        class="form__input"
                        placeholder="Phone"
                        value={user.phone}
                        onChange={handleInputs}
                      />
                    </div>
                    <div class="row login_row_value">
                      <p
                        style={{
                          margin: "0",
                          textAlign: "left",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        * Required
                      </p>
                      <input
                        type="text"
                        name="password"
                        id="password"
                        class="form__input"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleInputs}
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
                        name="signup"
                        value="Signup"
                        class="btn_login_form"
                        onClick={PostData}
                      />
                    </div>
                  </form>
                </div>
                <div class="row login_row_value">
                  <p style={{ paddingBottom: "20px" }}>
                    Already have an account?{" "}
                    <Link to="/login">
                      <a>Login now</a>
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
export default SignUp;
