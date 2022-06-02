import { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const [ordernotify, setorderNotify] = useState(0);
  const [bookingnotify, setbookingNotify] = useState(0);
  const [querynotify, setqueryNotify] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  var orderNotify;
  var bookingNotify;
  var queryNotify;

  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  const getNotification = async () => {
    const res = await fetch("http://localhost:5001/adminnotify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    orderNotify = data.filter((elemenet) => {
      return elemenet.notification == 1;
    });

    bookingNotify = data.filter((elemenet) => {
      return elemenet.notification == 2;
    });
    queryNotify = data.filter((elemenet) => {
      return elemenet.notification == 3;
    });
    var orderlengthArr = orderNotify.length;
    if (orderlengthArr > 0) {
      setorderNotify(orderlengthArr);
    } else {
      setorderNotify(0);
    }
    var bookinglengthArr = bookingNotify.length;
    if (bookinglengthArr > 0) {
      setbookingNotify(bookinglengthArr);
    } else {
      setbookingNotify(0);
    }
    var querylengthArr = queryNotify.length;
    if (querylengthArr > 0) {
      setqueryNotify(querylengthArr);
    } else {
      setqueryNotify(0);
    }
  };

  useEffect(() => {
    getNotification();
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const setRead = async (arg) => {
    const res = await fetch("http://localhost:5001/deletenotofication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: arg }),
    });
    const data = await res.json();
  };

  return (
    <div>
      <div
        class="mycontainer"
        style={{
          width: "100%",
          overflow: "hidden",
          margin: "0",
        }}
      >
        <nav>
          <ul
            class="mcd-menu"
            style={{ width: "100%", backgroundColor: "#212F3D " }}
          >
            <Link to="/adminorders" style={{ textDecoration: "none" }}>
              <li onClick={() => setRead(1)}>
                <a href="" style={{ paddingLeft: "20px" }}>
                  <i class="fa fa-truck "></i>
                  <strong style={{ paddingLeft: "40px" }}>
                    Orders{" "}
                    {ordernotify == 0 ? (
                      ""
                    ) : (
                      <span
                        style={{
                          color: "red",
                          border: "2px solid red",
                          padding: "0px 5px",
                          fontSize: "1vw",
                          marginLeft: "5px",
                        }}
                      >
                        {ordernotify}
                      </span>
                    )}
                  </strong>
                </a>
              </li>
            </Link>
            <Link to="/adminbooking" style={{ textDecoration: "none" }}>
              <li onClick={() => setRead(2)}>
                <a href="" style={{ paddingLeft: "20px" }}>
                  <i class="fa fa-calendar"></i>
                  <strong style={{ paddingLeft: "40px" }}>
                    Bookings
                    {bookingnotify == 0 ? (
                      ""
                    ) : (
                      <span
                        style={{
                          color: "red",
                          border: "2px solid red",
                          padding: "0px 5px",
                          fontSize: "1vw",
                          marginLeft: "5px",
                        }}
                      >
                        {bookingnotify}
                      </span>
                    )}
                  </strong>
                </a>
              </li>
            </Link>

            <Link to="/adminquery" style={{ textDecoration: "none" }}>
              <li onClick={() => setRead(3)}>
                <a href="" style={{ paddingLeft: "20px" }}>
                  <i class="fa fa-envelope"></i>
                  <strong style={{ paddingLeft: "40px" }}>
                    Queries
                    {querynotify == 0 ? (
                      ""
                    ) : (
                      <span
                        style={{
                          color: "red",
                          border: "2px solid red",
                          padding: "0px 5px",
                          fontSize: "1vw",
                          marginLeft: "5px",
                        }}
                      >
                        {querynotify}
                      </span>
                    )}
                  </strong>
                </a>
              </li>
            </Link>
            <Link to="/additem" style={{ textDecoration: "none" }}>
              <li>
                <a href="" style={{ paddingLeft: "20px" }}>
                  <i class="fas fa-cart-plus"></i>
                  <strong style={{ paddingLeft: "40px" }}>Products</strong>
                </a>
              </li>
            </Link>
            <Link to="/completed" style={{ textDecoration: "none" }}>
              <li>
                <a href="" style={{ paddingLeft: "20px" }}>
                  <i class="fa fa-archive"></i>
                  <strong style={{ paddingLeft: "40px" }}>All Orders</strong>
                </a>
              </li>
            </Link>
            <Link to="/completedbooking" style={{ textDecoration: "none" }}>
              <li>
                <a href="" style={{ paddingLeft: "20px" }}>
                  <i class="fa fa-archive"></i>
                  <strong style={{ paddingLeft: "40px" }}>All Bookings</strong>
                </a>
              </li>
            </Link>
            <Link to="/dboyregister" style={{ textDecoration: "none" }}>
              <li>
                <a href="" style={{ paddingLeft: "20px" }}>
                  <i class="fas fa-people-carry"></i>
                  <strong style={{ paddingLeft: "40px" }}>Register Dboy</strong>
                </a>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
