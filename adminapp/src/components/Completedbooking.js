import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsTrashFill, BsArrowLeft } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Completedbooking = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Confirm");
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const diffToast = () => {
    toast.success("Booking Status Updated", {
      autoClose: 3000,
      position: "top-center",
      hideProgressBar: false,
    });
  };

  const updateData = async (id) => {
    const res = await fetch("http://localhost:5001/updatebookingstatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, status: status }),
    });
    const data = await res.json();
    if (res.status === 200 || data) {
      diffToast();
    } else {
      window.alert("Updation not successfull");
    }
  };

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/bookingtrashdata", {
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
  }, [Completedbooking]);

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

  const deleteData = async (id) => {
    const res = await fetch("http://localhost:5001/deleteadminbooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    props.Remove();
    history.push("/completedbooking");
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
            All Bookings
          </h1>
          <div className="refresh_holder">
            <Link to="/completedbooking">
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
                  </div>
                  <div>
                    <button
                      className="remove_permanent_button"
                      onClick={() => deleteData(searchdata._id)}
                    >
                      <BsTrashFill className="cross_button_two"></BsTrashFill>
                    </button>
                  </div>
                </div>
                <div
                  class="row"
                  style={{
                    backgroundColor: "orangered",
                    margin: "15px 0px 0px 0px",
                    fontSize: "10px",
                    padding: "3px 15px 3px 10px",
                  }}
                >
                  {searchdata.bookingdate}
                </div>
                <div
                  style={{
                    textAlign: "center",
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
              <div class="row row_handler_order" style={{ paddingBottom: "0" }}>
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
                  </div>
                  <div style={{ position: "relative" }}>
                    <button
                      className="remove_permanent_button"
                      onClick={() => deleteData(cvalue._id)}
                    >
                      <BsTrashFill className="cross_button_two"></BsTrashFill>
                    </button>
                  </div>
                </div>
                <div
                  class="row"
                  style={{
                    backgroundColor: "orangered",
                    margin: "15px 0px 0px 0px",
                    fontSize: "10px",
                    padding: "3px 15px 3px 10px",
                  }}
                >
                  {cvalue.bookingdate}
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

export default Completedbooking;
