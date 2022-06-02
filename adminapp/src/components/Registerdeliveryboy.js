import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

export const Dboyregister = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  var [error, setError] = useState(false);
  var [errorMessages, setMessage] = useState("");

  const addToList = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/registerdboy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
      }),
    });
    const data = await res.json();
    console.log("person data", data);
    if (res.status === 422 || !data) {
      setError(true);
      setMessage(" details field can't be empty");
    } else if (res.status === 423 || !data) {
      setError(true);
      setMessage("email already registered");
    } else if (res.status === 428 || !data) {
      setError(true);
      setMessage("not a proper phone number");
    } else {
      window.alert(
        "Email - " + data.email + "," + "Password - " + data.password
      );
    }
  };

  return (
    <div
      class="container"
      style={{
        width: "80%",
        margin: "10px auto",
        border: "2px solid orangered",
        padding: "0% 5%",
        boxShadow: "1px 1px 5px 1px grey",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#566573",
          padding: "20px 0px",
          fontFamily: "fantasy",
          letterSpacing: "1px",
        }}
      >
        Register Delivery Person
      </h2>
      <div>
        <form method="POST">
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
            </p>{" "}
            <input
              type="text"
              class="form__input"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
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
            </p>{" "}
            <input
              type="text"
              class="form__input"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
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
              type="number"
              id="phone"
              class="form__input"
              placeholder="Phone"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
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
            <textarea
              id="address"
              class="form__input"
              placeholder="Address"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
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
              class="form__input"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          {error ? (
            <p style={{ textAlign: "left", color: "red" }}>* {errorMessages}</p>
          ) : (
            ""
          )}
          <div class="row login_row_value">
            <input
              type="submit"
              name="place"
              value="Register"
              class="btn_login_form"
              onClick={addToList}
              style={{
                width: "50%",
                margin: " 20px auto",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dboyregister;
