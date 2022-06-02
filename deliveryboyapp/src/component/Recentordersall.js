import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsTrashFill, BsArrowLeft, BsXCircleFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const Recentordersall = (props) => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [alldata, setalldata] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/allorderdatadelivery", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    data.reverse();
    setalldata(data);
  }, []);

  function Search(alldata) {
    return alldata.orderno === search;
  }

  function clickMe() {
    if (search === "") {
      setError(true);
      seterrorMessage("* please enter an order id to search");
    } else {
      seterrorMessage("");
      setSearchdata(alldata.find(Search));
      if (alldata.find(Search)) {
        setShow(true);
        setSearchdata(alldata.find(Search));
      } else {
        setShow(false);
        setError(true);
        seterrorMessage("* invalid order id");
      }
    }
  }
  function setTrue() {
    setShow(false);
  }

  const addtoActive = async (orderno) => {
    const res = await fetch("http://localhost:5001/addtodeliveryboy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderno: orderno,
        name: props.deliveryboydata.name,
        email: props.deliveryboydata.email,
        phone: props.deliveryboydata.phone,
        address: props.deliveryboydata.address,
        deliveryboyid: props.deliveryboydata.deliveryboyid,
      }),
    });
    // props.Remove();
    history.push("/recents");
  };

  /*************JSX WORK ********/
  return (
    <div class="container-fluid" style={{ padding: "0", margin: "0" }}>
      <ToastContainer />
      <div className="holder_content_setter_style">
        <div
          style={{ position: "relative" }}
          className="page_header_mob_control"
        >
          <h1
            className="active_order_heading"
            style={{ fontFamily: "fantasy" }}
          >
            Recent Orders
          </h1>
          <div className="refresh_holder">
            <Link to="/recents">
              <button className="refresh_button_orders">Refresh</button>
            </Link>
          </div>
        </div>

        <div class="container-fluid">
          {/* /*********Search work */}
          <button onClick={clickMe} className="searchButton_admin">
            Search
          </button>
          <input
            type="number"
            name="search"
            id="search"
            class="form__input"
            placeholder="Enter Order ID....."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{
              width: "50%",
              marginTop: "0",
              borderBottom: "2px solid orangered",
            }}
          />
          {error ? (
            <p
              style={{
                color: "red",
                paddingBottom: "10px",
                margin: "0",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </p>
          ) : (
            ""
          )}
          {show ? (
            <div class="container-fluid">
              <div class="row row_handler_order" style={{ paddingBottom: "0" }}>
                <div class="col-sm my-col-sm handler">
                  (ID:&nbsp;&nbsp;{searchdata.orderno})<br />
                  <span className="On_mobile_order_details_show">
                    &#x1F35B;&nbsp;&nbsp;
                  </span>{" "}
                  {searchdata.order_details}
                </div>
                <div class="col-sm my-col-sm handler">
                  <div style={{ marginBottom: "5px" }}>
                    <span className="On_mobile_order_details_show">
                      &#x1f468;&nbsp;&nbsp;&nbsp;
                    </span>
                    {searchdata.cust_name}
                  </div>
                  <div>
                    <span className="On_mobile_order_details_show">
                      &#128222;&nbsp;&nbsp;
                    </span>
                    <a
                      href={"tel:" + searchdata.cust_phone}
                      className="call_maker"
                    >
                      <FaPhoneAlt
                        className="phone_mob_none"
                        style={{ marginRight: "5px" }}
                      ></FaPhoneAlt>
                      {searchdata.cust_phone}
                    </a>
                  </div>
                </div>
                <div class="col-sm my-col-sm handler">
                  <span className="On_mobile_order_details_show">
                    &#127968;&nbsp;&nbsp;&nbsp;
                  </span>
                  {searchdata.address}
                </div>
                <div class="col-sm my-col-sm handler">
                  <div>
                    <span className="On_mobile_order_details_show">
                      &#128181;&nbsp;&nbsp;&nbsp;
                    </span>
                    Rs {searchdata.total_price}
                  </div>
                  <div>
                    <span className="On_mobile_order_details_show">
                      &#128179;&nbsp;&nbsp;&nbsp;
                    </span>
                    {searchdata.payment}
                  </div>
                </div>
                <div class="col-sm my-col-sm handler">
                  <div className="select_holder">
                    {/* <span className="On_mobile_order_details_show">
                      &#11093;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="live_status" style={{ color: "red" }}>
                      {searchdata.status}
                    </span> */}
                    {/* <br /> */}

                    <button
                      className="update_button_orders"
                      onClick={() => addtoActive(searchdata.orderno)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    borderTop: "1px solid #D5D8DC",
                    paddingTop: "20px",
                  }}
                >
                  <button onClick={setTrue} className="searchclear_admin">
                    <BsArrowLeft></BsArrowLeft> Clear
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="Mob_heading_page_for_all_partion">
            <p>All Recent Orders</p>
          </div>
          <div className="hide_mob">
            <div
              class="row row_handler_order"
              style={{ backgroundColor: "orangered", color: "white" }}
            >
              <div class="col-sm handler">Order Summary</div>
              <div class="col-sm handler">Customer Details</div>
              <div class="col-sm handler">Address</div>
              <div class="col-sm handler">Order Value</div>
              <div class="col-sm handler">Manage Order</div>
            </div>
          </div>
        </div>

        {alldata.map((cvalue, index) => {
          return (
            <div class="container-fluid ">
              <div className="order_mob_show">
                <div
                  class="row row_handler_order"
                  style={{ paddingTop: "0px" }}
                >
                  <div
                    class="row"
                    style={{
                      backgroundColor: "#2C3E50",
                      margin: "0px 0px 15px 0px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      padding: "5px 15px 5px 10px",
                      color: "orangered",
                    }}
                  >
                    <span className="mob_order_id">
                      Order ID : {cvalue.orderno}
                    </span>
                  </div>
                  <div class="col-sm my-col-sm handler">
                    <span className="On_mobile_order_details_show">
                      &#x1F35B;&nbsp;&nbsp;&nbsp;
                    </span>
                    {cvalue.order_details}
                  </div>
                  <div class="col-sm my-col-sm handler">
                    <div style={{ marginBottom: "5px" }}>
                      <span className="On_mobile_order_details_show">
                        &#x1f468;&nbsp;&nbsp;&nbsp;
                      </span>
                      {cvalue.cust_name}
                    </div>
                    <div>
                      <span className="On_mobile_order_details_show">
                        &#128222;&nbsp;&nbsp;
                      </span>{" "}
                      <a
                        href={"tel:" + cvalue.cust_phone}
                        className="call_maker"
                      >
                        <FaPhoneAlt
                          className="phone_mob_none"
                          style={{ marginRight: "5px" }}
                        ></FaPhoneAlt>

                        {cvalue.cust_phone}
                      </a>
                    </div>
                  </div>
                  <div class="col-sm my-col-sm handler">
                    <span className="On_mobile_order_details_show">
                      &#127968;&nbsp;&nbsp;&nbsp;
                    </span>
                    {cvalue.address}
                  </div>
                  <div class="col-sm my-col-sm handler">
                    <div>
                      <span className="On_mobile_order_details_show">
                        &#128181;&nbsp;&nbsp;&nbsp;
                      </span>
                      Rs {cvalue.total_price}
                    </div>
                    <div>
                      {" "}
                      <span className="On_mobile_order_details_show">
                        &#128179;&nbsp;&nbsp;&nbsp;
                      </span>
                      {cvalue.payment}
                    </div>
                  </div>
                  <div class="col-sm my-col-sm handler">
                    <div className="select_holder">
                      {/* <span className="On_mobile_order_details_show">
                        &#11093;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span className="live_status" style={{ color: "red" }}>
                        {cvalue.status}
                      </span>
                      <br /> */}

                      <button
                        className="update_button_orders"
                        onClick={() => addtoActive(cvalue.orderno)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recentordersall;
