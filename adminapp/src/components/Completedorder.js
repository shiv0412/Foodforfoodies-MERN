import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsTrashFill, BsArrowLeft } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Completed = (props) => {
  const history = useHistory();
  const [orderdata, setOrderdata] = useState([]);
  const [status, setStatus] = useState("Confirm");
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const diffToast = () => {
    toast.success("Status Updated", {
      autoClose: 3000,
      position: "top-center",
      hideProgressBar: false,
    });
  };

  const updateData = async (id) => {
    const res = await fetch("http://localhost:5001/updatestatus", {
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
    const res = await fetch("http://localhost:5001/trashdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({ uniquekey }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      //   history.push("/adminlogin");
    } else {
      data.reverse();
      setOrderdata(data);
    }
  }, [Completed]);

  function Search(orderdata) {
    return orderdata.orderno === search;
  }

  function clickMe() {
    if (search === "") {
      setError(true);
      seterrorMessage("* please enter an order id to search");
    } else {
      seterrorMessage("");
      setSearchdata(orderdata.find(Search));
      if (orderdata.find(Search)) {
        setShow(true);
        setSearchdata(orderdata.find(Search));
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

  const deleteData = async (id) => {
    const res = await fetch("http://localhost:5001/deleteadminorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    props.Remove();
    history.push("/completed");
  };
  /*************JSX WORK ********/
  return (
    <div class="container-fluid">
      <ToastContainer />
      <div style={{ width: "95%", margin: "auto" }}>
        <div style={{ position: "relative", marginBottom: "30px" }}>
          <h1
            className="active_order_heading"
            style={{ fontFamily: "fantasy" }}
          >
            Completed Orders
          </h1>
          <div className="refresh_holder">
            <Link to="/completed">
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
                  (ID:{searchdata.orderno})<br />
                  {searchdata.order_details}
                </div>
                <div class="col-sm my-col-sm handler">
                  <div style={{ marginBottom: "5px" }}>
                    {searchdata.cust_name}
                  </div>
                  <div>
                    <a
                      href={"tel:" + searchdata.cust_phone}
                      className="call_maker"
                    >
                      <FaPhoneAlt style={{ marginRight: "5px" }}></FaPhoneAlt>
                      {searchdata.cust_phone}
                    </a>
                  </div>
                </div>
                <div class="col-sm my-col-sm handler">{searchdata.address}</div>
                <div class="col-sm my-col-sm handler">
                  <div>Rs {searchdata.total_price}</div>
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
                  {searchdata.date}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "0px",
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
            <div class="col-sm handler">Order Summary</div>
            <div class="col-sm handler">Customer Details</div>
            <div class="col-sm handler">Address</div>
            <div class="col-sm handler">Order Value</div>
            <div class="col-sm handler">Manage Order</div>
          </div>
        </div>

        {orderdata.map((cvalue, index) => {
          return (
            <div class="container-fluid">
              <div class="row row_handler_order" style={{ paddingBottom: "0" }}>
                <div class="col-sm my-col-sm handler">
                  ( ID: {cvalue.orderno} )<br />
                  {cvalue.order_details}
                </div>
                <div class="col-sm my-col-sm handler">
                  <div style={{ marginBottom: "5px" }}>{cvalue.cust_name}</div>
                  <div>
                    <a href={"tel:" + cvalue.cust_phone} className="call_maker">
                      <FaPhoneAlt style={{ marginRight: "5px" }}></FaPhoneAlt>
                      {cvalue.cust_phone}
                    </a>
                  </div>
                </div>
                <div class="col-sm my-col-sm handler">{cvalue.address}</div>
                <div class="col-sm my-col-sm handler">
                  <div>Rs {cvalue.total_price}</div>
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
                  {cvalue.date}
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

export default Completed;
