import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsTrashFill, BsXCircleFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillCursorFill, BsArrowLeft } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Adminquery = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/userquery", {
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
  }, [Adminquery]);

  function Search(data) {
    return data.queryid === search;
  }

  function clickMe() {
    if (search === "") {
      setError(true);
      seterrorMessage("* please enter an query id to search");
    } else {
      seterrorMessage("");
      setSearchdata(data.find(Search));
      if (data.find(Search)) {
        setShow(true);
        setSearchdata(data.find(Search));
      } else {
        setShow(false);
        setError(true);
        seterrorMessage("* invalid query id");
      }
    }
  }
  function setTrue() {
    setShow(false);
  }

  const Delete = async (id) => {
    const res = await fetch("http://localhost:5001/deletequery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    props.Remove();
    history.push("/adminquery");
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
            Queries
          </h1>
          <div className="refresh_holder">
            <Link to="/adminquery">
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
            placeholder="Enter Query ID....."
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
                  ( ID: {searchdata.queryid} )<br />
                  {searchdata.date}
                </div>

                <div class="col-sm my-col-sm handler">{searchdata.subject}</div>
                <div class="col-sm my-col-sm handler">
                  <div>{searchdata.message}</div>
                </div>
                <div class="col-sm my-col-sm handler">
                  <div style={{ marginBottom: "5px" }}>{searchdata.name}</div>
                  <div style={{ marginBottom: "10px" }}>
                    <a href={"tel:" + searchdata.phone} className="call_maker">
                      <FaPhoneAlt style={{ marginRight: "5px" }}></FaPhoneAlt>
                      {searchdata.phone}
                    </a>
                  </div>
                  <div className="email_query_handle">
                    <a
                      href={"mailto:" + searchdata.email}
                      className="call_maker"
                    >
                      <BsFillCursorFill
                        style={{ marginRight: "5px" }}
                      ></BsFillCursorFill>
                      {searchdata.email}
                    </a>
                    <div className="query_remover">
                      <button
                        className="remove_order_button"
                        onClick={() => Delete(searchdata._id)}
                      >
                        <BsXCircleFill className="cross_button"></BsXCircleFill>
                      </button>
                    </div>
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
            <div class="col-sm handler">Query Details</div>
            <div class="col-sm handler">Subject</div>
            <div class="col-sm handler">Message</div>
            <div class="col-sm handler">Manage Query</div>
          </div>
        </div>
        {data.map((cvalue, index) => {
          return (
            <div class="container-fluid">
              <div class="row row_handler_order">
                <div class="col-sm my-col-sm handler">
                  ( ID: {cvalue.queryid} )<br />
                  {cvalue.date}
                </div>

                <div class="col-sm my-col-sm handler">{cvalue.subject}</div>
                <div class="col-sm my-col-sm handler">
                  <div>{cvalue.message}</div>
                </div>
                <div class="col-sm my-col-sm handler">
                  <div style={{ marginBottom: "5px" }}>{cvalue.name}</div>
                  <div style={{ marginBottom: "10px" }}>
                    <a href={"tel:" + cvalue.phone} className="call_maker">
                      <FaPhoneAlt style={{ marginRight: "5px" }}></FaPhoneAlt>
                      {cvalue.phone}
                    </a>
                  </div>
                  <div className="email_query_handle">
                    <a href={"mailto:" + cvalue.email} className="call_maker">
                      <BsFillCursorFill
                        style={{ marginRight: "5px" }}
                      ></BsFillCursorFill>
                      {cvalue.email}
                    </a>
                    <div className="query_remover">
                      <button
                        className="remove_order_button"
                        onClick={() => Delete(cvalue._id)}
                      >
                        <BsXCircleFill className="cross_button"></BsXCircleFill>
                      </button>
                    </div>
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

export default Adminquery;
