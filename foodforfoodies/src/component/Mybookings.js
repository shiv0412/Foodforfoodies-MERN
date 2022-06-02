import React, { useState, useEffect } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";

const Mybooking = (props) => {
  const history = useHistory();
  const [orderdata, setOrderdata] = useState([]);
  const [status, setStatus] = useState("");
  const username = props.username;

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/userbookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      //   history.push("/adminlogin");
    } else {
      data.reverse();
      setOrderdata(data);
    }
  }, [Mybooking]);

  const Delete = async (id) => {
    const res = await fetch("http://localhost:5001/deleteuserbooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    props.onRemove();
    history.push("/mybooking");
  };

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
        >
          My Bookings
        </h1>
        <Link to="/mybooking">
          <button className="refresh_button_orders">Refresh</button>
        </Link>
      </div>
      {orderdata.map((cvalue, index) => {
        return (
          <div>
            <div class="container-fluid">
              <button
                className="delete_button_user_order delete_option_phone"
                onClick={() => Delete(cvalue._id)}
              >
                <BsXCircleFill className="delete_option_phone"></BsXCircleFill>
              </button>
              <div class="row order_show_row_data">
                <div class="col-sm my_col_sm_order_user">
                  ({cvalue.bookingid})<br></br>
                  {cvalue.name}
                </div>
                <div class="col-sm my_col_sm_order_user">
                  Person: {cvalue.persons}
                  <br />
                  Ocassion: {cvalue.ocassion}
                </div>
                <div class="col-sm my_col_sm_order_user">
                  Timings
                  <br />
                  {cvalue.status == "Confirm" || cvalue.status == "Completed"
                    ? cvalue.date
                    : "awaited"}
                  <br />
                </div>
                <div class="col-sm my_col_sm_order_user">
                  <span style={{ fontSize: "12px", color: "orangered" }}>
                    Status
                  </span>
                  <br />
                  <span className="order_status">
                    <span className="blink" style={{ textAlign: "left" }}>
                      {cvalue.status}
                    </span>
                  </span>
                </div>
                <div class="col-sm my_col_sm_order_user">
                  <button
                    className="delete_button_user_order"
                    onClick={() => Delete(cvalue._id)}
                  >
                    <BsXCircleFill className="delete_option"></BsXCircleFill>
                  </button>
                </div>
                <div class="row">
                  <div
                    className="order_date_row"
                    style={{
                      marginTop: "25px",
                      backgroundColor: "orangered",
                    }}
                  >
                    {cvalue.bookingdate}
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

export default Mybooking;
