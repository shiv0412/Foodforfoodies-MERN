import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Logo from "../images/logo2bgr.png";
import UID from "uniquebrowserid";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { BsPeopleCircle, BsFillArchiveFill } from "react-icons/bs";
import Adminorders from "./Adminorders";
import Adminquery from "./Adminquery";
import Adminbooking from "./Adminbookings";
import Completed from "./Completedorder";
import Completedbooking from "./Completedbooking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./Addproduct";
import Sidebar from "./Sidebar";

const Header = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(async () => {
    var uniquekey = new UID().completeID();
    const res = await fetch(
      "http://localhost:5001/adminprofile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uniquekey }),
      },
      [user]
    );
    const data = await res.json();
    if (res.status === 400 || !data) {
      history.push("/adminlogin");
    } else {
      setUser(data);
    }
  }, []);

  const adminlogOut = async () => {
    var uniquekey = new UID().completeID();
    const res = await fetch("http://localhost:5001/adminlogout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniquekey }),
    });
    const data = await res.json();

    // props.onLogout();
    history.push("/adminlogin");
  };

  return (
    <div>
      <ToastContainer />
      <img src={Logo} className="admin_logo"></img>
      <h1 className="admin_heading">Admin Pannel</h1>
      <h6 className="admin_welcome">Welcome:{user.email}</h6>
      <div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div style={{ position: "absolute", right: "20px", top: "15px" }}>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BsPeopleCircle className="admin_icon_profile"></BsPeopleCircle>
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
                style={{ backgroundColor: "#F4F6F6", textAlign: "center" }}
              >
                <li>
                  <a class="dropdown-item" href="#">
                    <button
                      className="admin_logout_button"
                      onClick={adminlogOut}
                    >
                      Logout
                    </button>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                {/* <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
