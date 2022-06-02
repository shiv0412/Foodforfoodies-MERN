import React, { useState, useEffect } from "react";
import { BsConeStriped } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";

function Orderdetails(props) {
  const [orderdata, setOrderdata] = useState([]);
  const [color0, setColor0] = useState("grey");
  const [color1, setColor1] = useState("grey");
  const [color2, setColor2] = useState("grey");
  const [color3, setColor3] = useState("grey");
  const [color4, setColor4] = useState("grey");
  const [color00, setColor00] = useState("black");
  const [color01, setColor01] = useState("black");
  const [color02, setColor02] = useState("black");
  const [color03, setColor03] = useState("black");
  const [color04, setColor04] = useState("black");

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/userorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: props.username }),
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      //   history.push("/adminlogin");
    } else {
      var orderdetails = data.filter((element) => {
        return element.orderno == props.id;
      });
      setOrderdata(orderdetails);
    }
  }, [Orderdetails]);

  useEffect(() => {
    console.log("order data in 2", orderdata);
    orderdata.map((cvalue) => {
      if (cvalue.status == "Ordered") {
        setColor0("green");
        setColor00("red");
      } else if (cvalue.status == "Confirm") {
        setColor0("green");
        setColor1("green");
        setColor01("red");
      } else if (cvalue.status == "Prepared") {
        setColor0("green");
        setColor1("green");
        setColor2("green");
        setColor02("red");
      } else if (cvalue.status == "Out for delivery") {
        setColor0("green");
        setColor1("green");
        setColor2("green");
        setColor3("green");
        setColor03("red");
      } else if (cvalue.status == "Completed") {
        setColor0("green");
        setColor1("green");
        setColor2("green");
        setColor3("green");
        setColor4("green");
        setColor04("red");
      }
    });
  });

  return (
    <div>
      <div>
        <h1
          style={{
            textAlign: "center",
            textShadow: "2px 2px 5px #B2BABB",
            color: "orangered",
            fontFamily: "fantasy",
            paddingBottom: "20px",
          }}
          className="header_mob_order_details_page"
        >
          Order Details
        </h1>
        <Link to="/orderdetails">
          <button className="refresh_button_orders">Refresh</button>
        </Link>
      </div>
      {orderdata.map((cvlaue) => {
        return (
          <div>
            <div className="order_details_page_data_holder">
              <h5
                style={{
                  paddingLeft: "5px",
                  color: "orangered",
                  fontWeight: "bold",
                }}
                className="details_header"
              >
                Order Details
              </h5>
              <table className="order_page_table_data">
                <tr>
                  <td className="td_bold_details">Order No</td>
                  <td className="td_two_details">{cvlaue.orderno}</td>
                </tr>
                <tr>
                  <td className="td_bold_details">Order Items</td>
                  <td className="td_two_details">{cvlaue.order_details}</td>
                </tr>
                <tr>
                  <td className="td_bold_details">Order Total</td>
                  <td className="td_two_details">{cvlaue.total_price} Rs/-</td>
                </tr>
                <tr>
                  <td className="td_bold_details">Date</td>
                  <td className="td_two_details">
                    {cvlaue.date.substr(0, 25)}
                  </td>
                </tr>
              </table>
            </div>
            {cvlaue.dpname == "" ? (
              ""
            ) : (
              <div className="order_details_page_data_holder">
                <h5
                  style={{
                    paddingLeft: "5px",
                    color: "orangered",
                    fontWeight: "bold",
                  }}
                  className="details_header"
                >
                  Your Valet Today
                </h5>
                <table className="order_page_table_data">
                  <tr>
                    <td className="td_bold_details">Valet Phone</td>
                    <td className="td_two_details">
                      <a
                        style={{ color: "orangered" }}
                        href={"tel:" + cvlaue.dpphone}
                      >
                        &#128222;&nbsp;&nbsp;{cvlaue.dpphone}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="td_bold_details">Valet Name</td>
                    <td className="td_two_details">{cvlaue.dpname}</td>
                  </tr>
                </table>
              </div>
            )}
            <div className="order_details_page_data_holder">
              <h5
                style={{
                  paddingLeft: "5px",
                  color: "orangered",
                  fontWeight: "bold",
                  paddingBottom: "10px",
                }}
                className="details_header"
              >
                Track Order Status
              </h5>
              <div
                style={{
                  borderLeft: "2px dashed orangered",
                  height: "330px",
                  width: "70%",
                  margin: "auto",
                  position: "relative",
                }}
                className="data_tracker_font_mob"
              >
                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: color0,
                    borderRadius: "50%",
                    textAlign: "Center",
                    fontWeight: "bold",
                    color: "white",
                    position: "absolute",
                    left: "-17px",
                    top: "8px",
                    paddingTop: "3px",
                  }}
                >
                  &#10003;
                </div>

                <div
                  style={{
                    textAlign: "Center",
                    fontWeight: "bold",
                    position: "absolute",
                    left: "25px",
                    top: "10px",
                    color: color00,
                  }}
                  className="order_tracker_line"
                >
                  Your Order is placed successfully
                </div>
                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: color1,
                    borderRadius: "50%",
                    textAlign: "Center",
                    fontWeight: "bold",
                    color: "white",
                    position: "absolute",
                    left: "-17px",
                    top: "78px",
                    paddingTop: "3px",
                  }}
                >
                  &#10003;
                </div>
                <div
                  style={{
                    textAlign: "Center",
                    fontWeight: "bold",

                    position: "absolute",
                    left: "25px",
                    top: "80px",
                    color: color01,
                  }}
                  className="order_tracker_line"
                >
                  Order confirmed by the restaurant
                </div>

                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: color2,
                    borderRadius: "50%",
                    textAlign: "Center",
                    fontWeight: "bold",
                    color: "white",
                    position: "absolute",
                    left: "-17px",
                    top: "148px",
                    paddingTop: "3px",
                  }}
                >
                  &#10003;
                </div>
                <div
                  style={{
                    textAlign: "Center",
                    fontWeight: "bold",

                    position: "absolute",
                    left: "25px",
                    top: "150px",
                    color: color02,
                  }}
                  className="order_tracker_line"
                >
                  Restaurant is preparing your food
                </div>

                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: color3,
                    borderRadius: "50%",
                    textAlign: "Center",
                    fontWeight: "bold",
                    color: "white",
                    position: "absolute",
                    left: "-17px",
                    top: "218px",
                    paddingTop: "3px",
                  }}
                >
                  &#10003;
                </div>
                <div
                  style={{
                    textAlign: "Center",
                    fontWeight: "bold",

                    position: "absolute",
                    left: "25px",
                    top: "220px",
                    color: color03,
                  }}
                  className="order_tracker_line"
                >
                  Your order is out for delivery
                </div>
                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: color4,
                    borderRadius: "50%",
                    textAlign: "Center",
                    fontWeight: "bold",
                    color: "white",
                    position: "absolute",
                    left: "-17px",
                    top: "288px",
                    paddingTop: "3px",
                  }}
                >
                  &#10003;
                </div>
                <div
                  style={{
                    textAlign: "Center",
                    fontWeight: "bold",

                    position: "absolute",
                    left: "25px",
                    top: "290px",
                    color: color04,
                  }}
                  className="order_tracker_line"
                >
                  Order Delivered
                </div>
              </div>
            </div>
            <div className="order_details_page_data_holder">
              <h5
                style={{
                  paddingLeft: "5px",
                  color: "orangered",
                  fontWeight: "bold",
                }}
                className="details_header"
              >
                Payment Details
              </h5>
              <table className="order_page_table_data">
                <tr>
                  <td className="td_bold_details">Order Total</td>
                  <td className="td_two_details">{cvlaue.total_price} Rs/-</td>
                </tr>
                <tr>
                  <td className="td_bold_details">Delivery Charge</td>
                  <td className="td_two_details">40 Rs/-</td>
                </tr>
                <tr>
                  <td className="td_bold_details">Payment Mode</td>
                  <td className="td_two_details">Cash on Delivery</td>
                </tr>
              </table>
            </div>
            <div className="order_details_page_data_holder">
              <h5
                style={{
                  paddingLeft: "5px",
                  color: "orangered",
                  fontWeight: "bold",
                }}
                className="details_header"
              >
                Shipping Details
              </h5>
              <table className="order_page_table_data">
                <tr>
                  <td className="td_bold_details">Customer Name</td>
                  <td className="td_two_details">{cvlaue.cust_name}</td>
                </tr>
                <tr>
                  <td className="td_bold_details">Phone</td>
                  <td className="td_two_details">{cvlaue.cust_phone}</td>
                </tr>
                <tr>
                  <td className="td_bold_details">Delivery Address</td>
                  <td className="td_two_details">{cvlaue.address}</td>
                </tr>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Orderdetails;
