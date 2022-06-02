import React, { useState, useEffect } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import Orderdetails from "./Orderdetails";

const Myorders = (props) => {
  const history = useHistory();
  const [orderdata, setOrderdata] = useState([]);
  const username = props.username;
  const [ordernumber, setOrdernumber] = useState();
  const [visibledetails, setVisibledetails] = useState(false);
  const [visibleoverview, setVisibleoverview] = useState(true);
  useEffect(async () => {
    const res = await fetch("http://localhost:5001/userorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      //   history.push("/adminlogin");
    } else {
      data.reverse();
      setOrderdata(data);
    }
  }, [Myorders]);

  const Delete = async (id) => {
    const res = await fetch("http://localhost:5001/deleteuserorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    props.onRemove();
    history.push("/myorders");
  };

  function show(orderno) {
    props.Ordernumber(orderno);
  }

  return (
    <div style={{ padding: "10px 0px" }}>
      <div>
        <h1
          style={{
            textAlign: "center",
            textShadow: "2px 2px 5px #B2BABB",
            color: "orangered",
            fontFamily: "fantasy",
            paddingBottom: "20px",
          }}
        >
          My orders
        </h1>
        <Link to="/myorders">
          <button className="refresh_button_orders">Refresh</button>
        </Link>
      </div>

      {orderdata.map((cvalue, index) => {
        return (
          <div>
            <div class="container-fluid">
              {cvalue.status == "Completed" ? (
                <button
                  className="delete_button_user_order delete_option_phone"
                  onClick={() => Delete(cvalue._id)}
                >
                  <BsXCircleFill className="delete_option_phone"></BsXCircleFill>
                </button>
              ) : (
                ""
              )}
              <div class="row order_show_row_data">
                <div class="col-sm my_col_sm_order_user">
                  ( Order No. : {cvalue.orderno} )
                </div>
                <div class="col-sm my_col_sm_order_user">
                  <span className="On_mobile_order_details_show">
                    &#x1F35B;&nbsp;&nbsp;
                  </span>
                  {cvalue.order_details}
                  <br />
                  <span className="On_mobile_order_details_show">
                    &#128181;&nbsp;&nbsp;
                  </span>
                  Rs {cvalue.total_price}
                  <br />
                  <span className="On_mobile_order_details_show">
                    &#128179;&nbsp;&nbsp;
                  </span>
                  Cash on Delivery
                </div>
                <div class="col-sm my_col_sm_order_user">
                  <span className="On_mobile_order_details_show">
                    &#127968;&nbsp;&nbsp;&nbsp;
                  </span>
                  {cvalue.address}
                  <br />
                  <span className="On_mobile_order_details_show">
                    &#128222;&nbsp;&nbsp;&nbsp;
                  </span>
                  {cvalue.cust_phone}
                </div>
                <div class="col-sm my_col_sm_order_user">
                  <span className="On_mobile_order_details_show">
                    &#11093;&nbsp;&nbsp;&nbsp;
                  </span>

                  <span className="blink" style={{ textAlign: "left" }}>
                    {cvalue.status}
                  </span>

                  {cvalue.dpname == "" ? (
                    ""
                  ) : (
                    <div className="valet_details_myorder_main">
                      Valet name : {cvalue.dpname} <br />
                      Valet Phone :
                      <span className="phone_valet_details_main">
                        <a href={"tel:" + cvalue.dpphone}>
                          &#128222;&nbsp;&nbsp;{cvalue.dpphone}
                        </a>
                      </span>
                    </div>
                  )}
                </div>
                <div class="col-sm my_col_sm_order_user col_set_deleter">
                  {cvalue.status == "Completed" ? (
                    <button
                      className="delete_button_user_order"
                      onClick={() => Delete(cvalue._id)}
                    >
                      <BsXCircleFill className="delete_option"></BsXCircleFill>
                    </button>
                  ) : (
                    <div>
                      <span className="On_mobile_order_details_show">
                        &nbsp; &#9906;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;Active Order
                      </span>
                    </div>
                  )}
                </div>
                <div class="row">
                  <div
                    className="order_date_row"
                    style={{
                      marginTop: "25px",
                      backgroundColor: "orangered",
                      paddingBottom: "7px",
                    }}
                  >
                    {cvalue.date.substr(0, 25)}
                    <button
                      style={{
                        position: "absolute",
                        right: "15%",
                        backgroundColor: "orangered",
                        color: "white",
                        padding: "0 5px",
                        fontWeight: "bold",
                        border: "2px solid white",
                      }}
                      onClick={() => show(cvalue.orderno)}
                    >
                      Show Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Myorders;
