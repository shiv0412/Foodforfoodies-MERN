import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsTrashFill, BsArrowLeft, BsXCircleFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Adminbooking = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Confirm");
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const updateData = async (bookingid) => {
    const res = await fetch("http://localhost:5001/updatebookingstatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingid: bookingid, status: status }),
    });
    const data = await res.json();
    if (res.status === 200 || data) {
      props.Update();
      history.push("/adminbooking");
    } else {
      window.alert("Updation not successfull");
    }
  };

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/adminbookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({ uniquekey }),
    });
    const data = await res.json();
    console.log("Order Data", data);
    if (res.status === 400 || !data) {
      //   history.push("/adminlogin");
    } else {
      data.reverse();
      setData(data);
    }
  }, [Adminbooking]);

  function Search(data) {
    return data.bookingid === search;
  }

  function clickMe() {
    if (search === "") {
      setError(true);
      seterrorMessage("* please enter an booking id to search");
    } else {
      seterrorMessage("");
      setSearchdata(data.find(Search));
      if (data.find(Search)) {
        setShow(true);
        setSearchdata(data.find(Search));
      } else {
        setShow(false);
        setError(true);
        seterrorMessage("* invalid booking id");
      }
    }
  }
  function setTrue() {
    setShow(false);
  }

  const addtoCompleted = async (id) => {
    const res = await fetch("http://localhost:5001/addbookingtotrash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    props.Remove();
    history.push("/adminbooking");
  };
  return (
    <div class="container-fluid">
      <ToastContainer />
      <div style={{ width: "95%", margin: "auto" }}>
        <div style={{ position: "relative", marginBottom: "30px" }}>
          <h1
            className="active_order_heading"
            style={{ fontFamily: "fantasy" }}
          >
            Table Bookings
          </h1>
          <div className="refresh_holder">
            <Link to="/adminbooking">
              <button className="refresh_button_orders">Refresh</button>
            </Link>
          </div>
        </div>
        <div class="container-fluid">
          {" "}
          {/* /*********Search work */}
          <button onClick={clickMe} className="searchButton_admin">
            Search
          </button>
          <input
            type="number"
            name="search"
            id="search"
            class="form__input"
            placeholder="Enter Booking ID....."
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
                  (ID: {searchdata.bookingid})<br />
                  Persons : {searchdata.persons}
                  <br />
                  Occassion : {searchdata.ocassion}
                </div>
                <div class="col-sm my-col-sm handler">
                  <div style={{ marginBottom: "5px" }}>{searchdata.name}</div>
                  <div>
                    <a href={"tel:" + searchdata.phone} className="call_maker">
                      <FaPhoneAlt style={{ marginRight: "5px" }}></FaPhoneAlt>
                      {searchdata.phone}
                    </a>
                  </div>
                </div>

                <div class="col-sm my-col-sm handler">
                  <div>{searchdata.date}</div>
                  <div>{searchdata.payment}</div>
                </div>
                <div class="col-sm my-col-sm handler">
                  <div className="select_holder">
                    <span className="live_status" style={{ color: "red" }}>
                      {searchdata.status}
                    </span>
                    <br />
                    <select
                      className="status_selector"
                      style={{ marginTop: "10px" }}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="Confirm">Confirm</option>
                      <option value="Not available">Unavailable</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <br />
                    <button
                      className="update_button_orders"
                      onClick={() => updateData(searchdata.bookingid)}
                    >
                      Update
                    </button>
                  </div>
                  <div className="delete_holder">
                    <button
                      className="remove_order_button"
                      onClick={() => addtoCompleted(searchdata._id)}
                    >
                      <BsXCircleFill className="cross_button"></BsXCircleFill>
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
          <div
            class="row row_handler_order"
            style={{ backgroundColor: "orangered", color: "white" }}
          >
            <div class="col-sm handler">Booking Summary</div>
            <div class="col-sm handler">Customer Details</div>
            <div class="col-sm handler">Booking Slot</div>
            <div class="col-sm handler">Manage Booking</div>
          </div>
        </div>
        {data.map((cvalue, index) => {
          return (
            <div class="container-fluid">
              <div class="row row_handler_order">
                <div class="col-sm my-col-sm handler">
                  ( ID: {cvalue.bookingid} )<br />
                  Persons : {cvalue.persons}
                  <br />
                  Occassion : {cvalue.ocassion}
                </div>
                <div class="col-sm my-col-sm handler">
                  <div style={{ marginBottom: "5px" }}>{cvalue.name}</div>
                  <div>
                    <a href={"tel:" + cvalue.phone} className="call_maker">
                      <FaPhoneAlt style={{ marginRight: "5px" }}></FaPhoneAlt>
                      {cvalue.phone}
                    </a>
                  </div>
                </div>

                <div class="col-sm my-col-sm handler">
                  <div>{cvalue.date}</div>
                  <div>{cvalue.payment}</div>
                </div>
                <div class="col-sm my-col-sm handler">
                  <div className="select_holder">
                    <span className="live_status" style={{ color: "red" }}>
                      {cvalue.status}
                    </span>
                    <br />
                    <select
                      className="status_selector"
                      style={{ marginTop: "10px" }}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="Confirm">Confirm</option>
                      <option value="Not available">Unavailable</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <br />
                    <button
                      className="update_button_orders"
                      onClick={() => updateData(cvalue.bookingid)}
                    >
                      Update
                    </button>
                  </div>
                  <div className="delete_holder">
                    <button
                      className="remove_order_button"
                      onClick={() => addtoCompleted(cvalue._id)}
                    >
                      <BsXCircleFill className="cross_button"></BsXCircleFill>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Adminbooking;
