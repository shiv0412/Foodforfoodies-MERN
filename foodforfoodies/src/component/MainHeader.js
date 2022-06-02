import React, { useEffect, useState } from "react";
import img1 from "../images/logo2bgr.png";
import cart from "../images/cart.png";
import { Link, useHistory } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { BsPeopleCircle } from "react-icons/bs";
import Axios from "axios";
import UID from "uniquebrowserid";
import Starter from "./Itemsubstarter";

const Header = (props) => {
  const history = useHistory();
  const [menuItems, setMenuitems] = useState([]);
  const [searchItems, setSearchitems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchHolder, setSearchholder] = useState(false);
  const [empty, setEmpty] = useState("No Item Found");
  const [isitem, setIsitem] = useState();

  useEffect(() => {
    Axios.get("http://localhost:4000/getproduct").then((response) => {
      setMenuitems(response.data);
    });
  }, [Header]);
  console.log("alldata", menuItems);

  const checkloggedIn = async () => {
    var uniquekey = new UID().completeID();
    const res = await fetch("http://localhost:5001/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniquekey }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      history.push("/login");
    } else {
      history.push("/profile");
    }
  };
  const logOut = async () => {
    var uniquekey = new UID().completeID();
    const res = await fetch("http://localhost:5001/logout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniquekey }),
    });
    const data = await res.json();
    props.onLogout();
    props.setoutButton();
    history.push("/");
  };
  function is_Blank(input) {
    if (input.length === 0) return true;
    else return false;
  }
  var newArr;
  const setFilter = (e) => {
    e.preventDefault();
    newArr = menuItems.filter((element) => {
      if (!is_Blank(search.trim())) {
        if (
          element.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          element.category
            .toLowerCase()
            .includes(search.toLowerCase().trim()) ||
          element.subcategory
            .toLowerCase()
            .includes(search.toLowerCase().trim()) ||
          element.price
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase().trim())
        ) {
          return element;
        }
      }
    });
    if (newArr.length > 0) {
      setIsitem(true);
      setSearchholder(true);
      setSearchitems(newArr);
    } else {
      setIsitem(false);
      setSearchholder(true);
      setEmpty("No Item Found");
    }
  };
  function handleClose() {
    setSearchholder(false);
  }
  return (
    <div>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
          <nav
            class="navbar navbar-light bg-light"
            style={{ boxShadow: "0px 0px black" }}
          >
            <span className="logo_adjest">
              <Link exact to="/">
                <img src={img1} width="200" height="65px" alt="" />
              </Link>
            </span>
          </nav>

          <div className="header_search_option_button">
            <form class="d-flex">
              <input
                class="header_search_option_input"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                class="header_search_option_button_search"
                type="submit"
                onClick={setFilter}
              >
                Search
              </button>
            </form>
          </div>

          <button
            class="navbar-toggler mob_nav_tog_handle"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              backgroundColor: "orangered",
              border: "1px solid black",
            }}
          >
            <span class="">
              <BsList></BsList>
            </span>
          </button>

          <div
            class="collapse navbar-collapse menu_control tablet_handle_option"
            id="navbarSupportedContent"
            style={{ textAlign: "center" }}
          >
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active menu_list_style">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <a class="nav-link menu_item_color" href="#">
                    <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                      Home
                    </span>
                  </a>
                </Link>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle menu_list_style"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                    Menu
                  </span>
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{
                    border: "none",
                    backgroundColor: "#F7F9F9",
                    textAlign: "center",
                  }}
                >
                  <Link to="/Lunch" style={{ textDecoration: "none" }}>
                    <a class="dropdown-item" href="#">
                      <span
                        style={{ color: "orangered", fontFamily: "fantasy" }}
                      >
                        Lunch
                      </span>
                    </a>
                  </Link>
                  <div class="dropdown-divider"></div>
                  <Link to="/breakfast" style={{ textDecoration: "none" }}>
                    <a class="dropdown-item" href="#">
                      <span
                        style={{ color: "orangered", fontFamily: "fantasy" }}
                      >
                        Breakfast
                      </span>
                    </a>
                  </Link>
                  <div class="dropdown-divider"></div>
                  <Link to="/dinner" style={{ textDecoration: "none" }}>
                    <a class="dropdown-item" href="#">
                      <span
                        style={{ color: "orangered", fontFamily: "fantasy" }}
                      >
                        Dinner
                      </span>
                    </a>
                  </Link>
                  <div class="dropdown-divider"></div>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <a class="dropdown-item" href="#">
                      <span
                        style={{ color: "orangered", fontFamily: "fantasy" }}
                      >
                        More
                      </span>
                    </a>
                  </Link>
                </div>
              </li>

              <li class="nav-item">
                <Link to="/gallery" style={{ textDecoration: "none" }}>
                  <a class="nav-link menu_list_style" href="#">
                    <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                      Gallery
                    </span>
                  </a>
                </Link>
              </li>
              <li class="nav-item menu_list_style">
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <a class="nav-link ">
                    <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                      About
                    </span>
                  </a>
                </Link>
              </li>
              <li class="nav-item menu_list_style">
                <Link to="/contactus" style={{ textDecoration: "none" }}>
                  <a class="nav-link ">
                    <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                      Contact
                    </span>
                  </a>
                </Link>
              </li>
              <li class="nav-item menu_list_style">
                <a class="nav-link ">
                  <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                    <td
                      onClick={() =>
                        window.open("http://localhost:3006/", "_blank")
                      }
                    >
                      Admin
                    </td>
                  </span>
                </a>
              </li>

              {/* This is for profile */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                    <BsPeopleCircle
                      style={{ fontSize: "25px" }}
                    ></BsPeopleCircle>
                  </span>
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{
                    border: "none",
                    backgroundColor: "#F7F9F9",
                    textAlign: "center",
                  }}
                >
                  <a class="dropdown-item">
                    <span style={{ color: "orangered", fontFamily: "fantasy" }}>
                      <button
                        className="account_button"
                        onClick={checkloggedIn}
                      >
                        My Account
                      </button>
                    </span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <Link to="/myorders" style={{ textDecoration: "none" }}>
                    <a class="dropdown-item">
                      <span
                        style={{ color: "orangered", fontFamily: "fantasy" }}
                      >
                        My Orders
                      </span>
                    </a>
                  </Link>

                  <div class="dropdown-divider"></div>

                  {props.buttonCheck ? (
                    <Link
                      to="/login"
                      style={{ fontFamily: "fantasy", color: "orangered" }}
                    >
                      {" "}
                      <a class="dropdown-item" style={{ color: "orangered" }}>
                        Login
                      </a>
                    </Link>
                  ) : (
                    <a class="dropdown-item">
                      <button
                        className="account_button"
                        style={{ fontFamily: "fantasy" }}
                        onClick={logOut}
                      >
                        Logout
                      </button>
                    </a>
                  )}
                </div>
              </li>

              <li class="nav-item">
                <Link exact to="/cart">
                  <img src={cart} width="45" height="40" alt=""></img>
                  {props.countCartItems < 1 ? (
                    " "
                  ) : (
                    <p className="cart_item_number_top">
                      {props.countCartItems}
                    </p>
                  )}
                </Link>
              </li>

              <li class="nav-item">
                <div className="header_search_option_button_tab">
                  <form class="d-flex">
                    <input
                      class="header_search_option_input_tab"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <button
                      class="header_search_option_button_search_tab"
                      type="submit"
                      onClick={setFilter}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* For Search Data */}
      {searchHolder ? (
        <div
          style={{
            position: "fixed",
            background: "#00000050",
            width: "100%",
            height: "100vh",
            top: "8px",
            left: "0",
            zIndex: 10,
          }}
        >
          <div className="manage_search_item_content">
            <div
              style={{
                position: "relative",
                width: "80%",
                margin: "0 auto",
                height: "auto",
                maxHeight: "70vh",
                marginTop: "calc(100vh - 85vh - 20px)",
                background: "#FBFCFC",
                borderRadius: "4px",
                padding: "20px",
                border: "1px solid #999",
                overflow: "auto",
              }}
              className="search_content_holder_pop"
            >
              {isitem ? (
                <Starter
                  products={searchItems}
                  onAdd={props.onAdd}
                  tag=""
                ></Starter>
              ) : (
                <div>{empty}</div>
              )}

              <span
                style={{
                  content: "x",
                  cursor: "pointer",
                  position: "absolute",
                  right: 10,
                  top: 15,
                  background: "orangered",
                  color: "white",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  lineHeight: "28px",
                  textAlign: "center",
                  border: "1px solid #999",
                  fontSize: "22px",
                  boxShadow: "1px 1px 5px 1px grey",
                }}
                className="close-icon_search"
                onClick={handleClose}
              >
                x
              </span>
              {props.content}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* End For Search Data */}
    </div>
  );
};

export default Header;
