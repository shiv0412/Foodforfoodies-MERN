import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

export const ShippingForm = (props) => {
  const history = useHistory();
  const { cartItems, onOrder, onPlaced } = props;
  const [cust_name, setName] = useState("");
  const [cust_phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [payment, setPayment] = useState("cod");
  var [error, setError] = useState(false);
  var [errorMessages, setMessage] = useState("");

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const orderitems = cartItems
    .map(({ name, qty }) => `${name} (${qty})`)
    .join(" ");

  const addToList = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/insertorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        cust_name: cust_name,
        cust_phone: cust_phone,
        address: address,
        order_details: orderitems,
        total_price: itemsPrice,
        status: "Ordered",
        payment: payment,
      }),
    });
    const data = res.json();
    if (res.status === 422 || !data) {
      setError(true);
      setMessage("shipping details can't be empty");
    } else if (res.status === 423 || !data) {
      setError(true);
      setMessage(
        "unsername not registered!!! register first or enter correct username"
      );
    } else if (res.status === 428 || !data) {
      setError(true);
      setMessage("not a proper phone number");
    } else {
      onOrder();
      onPlaced();
      history.push("/myorders");
    }
  };

  return (
    <div style={{ marginTop: "150px" }} class="container">
      <div class="container-fluid">
        <div className="handle_login_form" style={{ width: "100%" }}>
          <div class="row login_row_value main-content_login bg-success text-center">
            <div class="col-md-12 col-xs-12 col-sm-12 login_form ">
              <div class="container-fluid">
                <div class="row login_row_value">
                  <h2>Order Shipping Detail</h2>
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
                        class="form__input"
                        placeholder="Username"
                        onChange={(event) => {
                          setUsername(event.target.value);
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
                        placeholder="Name"
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                      />
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
                          placeholder="Delivery Address"
                          onChange={(event) => {
                            setAddress(event.target.value);
                          }}
                        />
                        {error ? (
                          <p style={{ textAlign: "left", color: "red" }}>
                            * {errorMessages}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div class="row login_row_value">
                        <h2 style={{ marginBottom: "10px" }}>Payment Option</h2>
                      </div>
                      <div class="row login_row_value">
                        <select
                          id="payment"
                          class="form__input"
                          onChange={(event) => {
                            setPayment(event.target.value);
                          }}
                        >
                          <option value="COD">Cash on Delivery</option>
                          <option value="Credit Card">Credit/Debit Card</option>
                          <option value="Upi">UPI/Paytm</option>
                        </select>
                      </div>
                    </div>

                    <div class="row login_row_value">
                      <input
                        type="submit"
                        name="place"
                        value="Place My Order"
                        class="btn_login_form"
                        onClick={addToList}
                        style={{ marginTop: "15px", marginBottom: "30px" }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
