import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import imagecart from "../images/empty cart.jpg";

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice;

  const checkOut = () => {
    return cartItems, totalPrice;
  };

  return (
    <div>
      <div class="container" style={{ marginTop: "130px" }}>
        <h1
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "orangered",
            fontFamily: "serif",
            marginBottom: "20px",
          }}
        >
          My Cart
        </h1>
        <div>
          {cartItems.length === 0 && (
            <div
              style={{
                textAlign: "center",
                fontFamily: "serif",
                paddingTop: "30px",
                paddingBottom: "30px",
                color: "#566573 ",
                fontSize: "35px",
              }}
            >
              <img src={imagecart} height="100px"></img>
              <div className="cart_title_text">
                Ohhhh..Your Cart is empty...
              </div>
              <Link
                to="/"
                style={{
                  textDecoration: "underline",
                  color: "orangered",
                  fontWeight: "bold",
                }}
                className="shopping_cart_button_empty"
              >
                <div>Continue Shopping</div>
              </Link>
            </div>
          )}
          {cartItems.map((item) => (
            <div
              class="container"
              key={item.id}
              style={{
                marginBottom: "5px",
                padding: "10px",
                boxShadow: "1px 1px 5px 1px black",
              }}
            >
              <div class="row">
                <div class="col-sm-3  cart_coloum img_div">
                  <img src={item.image} className="cart_img" />
                </div>
                <div class="col-sm-3  cart_coloum">
                  <h3 className="cart_item_title">{item.name}</h3>
                </div>
                <div class="col-sm-3  cart_coloum">
                  <button
                    className="cart_button_remove"
                    onClick={() => onRemove(item)}
                  >
                    -
                  </button>
                  <button
                    onClick={() => onAdd(item)}
                    className="cart_button_add"
                  >
                    +
                  </button>
                </div>
                <div class="col-sm-3  cart_coloum">
                  <h3 className="cart_item_price">
                    {item.qty} x Rs {item.price.toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <div>
                <div>
                  <div
                    style={{
                      textAlign: "right",
                      paddingRight: "12vw",
                      fontFamily: "serif",
                      fontSize: "25px",
                    }}
                  >
                    <strong>Total Price</strong>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      paddingRight: "12vw",
                      fontFamily: "serif",
                      fontSize: "25px",
                    }}
                  >
                    <strong>Rs {totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <hr />
                <div
                  style={{
                    textAlign: "right",
                    paddingRight: "12vw",
                  }}
                >
                  <Link to="/">
                    <button className="shop_more_button">
                      Continue Shopping
                    </button>
                  </Link>
                  <Link to="/shippingform">
                    <button
                      className="checkout_button"
                      onClick={() => checkOut()}
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
                <hr />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
