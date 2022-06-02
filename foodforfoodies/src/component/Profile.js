import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import Axios from "axios";
import UID from "uniquebrowserid";
import { FaUserCircle } from "react-icons/fa";
import { BsFillBagFill } from "react-icons/bs";
import { BsFillStopwatchFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Myorders from "./Myorders";
import Mybooking from "./Mybookings";
import Profileoption from "./Profileoptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myimg from "../images/myimgtwo.jpg";
import Orderdetails from "./Orderdetails";

export default function Profile() {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [ordernumber, setOrdernumber] = useState();

  const diffToast = () => {
    toast.success("Removed", {
      autoClose: 3000,
      position: "top-center",
      hideProgressBar: false,
    });
  };
  const onRemove = () => {
    diffToast();
  };
  useEffect(async () => {
    var uniquekey = new UID().completeID();
    const res = await fetch(
      "http://localhost:5001/profile",
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
      history.push("/login");
    } else {
      setUser(data);
    }
  }, []);

  function Detailssender(orderno) {
    setOrdernumber(orderno);
    history.push("/orderdetails");
  }
  return (
    <div style={{ marginTop: "110px" }}>
      <div class="container" style={{}}>
        <div class="row">
          <div class="col-sm profile_user_data_holder">
            {/* User main profile work */}
            <div className="delivery_boy_info_holder">
              <div className="delivery_boy_pic_container_outer">
                <p className="hr_pic_sideer">
                  <div className="delivery_boy_pic_holder">
                    <Link to="/profile">
                      <img
                        src={myimg}
                        height="115px"
                        width="115px"
                        style={{
                          borderRadius: "50%",
                          border: "2px solid orangered",
                        }}
                      />
                    </Link>
                  </div>
                </p>
              </div>
              <div className="delivery_boy_info_text">
                <p className="delivery_boy_info_text_name">{user.name}</p>
                <p className="delivery_boy_info_text_phone">{user.email}</p>
              </div>
            </div>
            {/* User main profile work end */}
          </div>
        </div>
        <div class="row options_holder_row">
          <Switch>
            <Route
              path="/myorders"
              component={() => (
                <Myorders
                  username={user.name}
                  Ordernumber={Detailssender}
                  onRemove={onRemove}
                ></Myorders>
              )}
            ></Route>
            <Route
              path="/mybooking"
              component={() => (
                <Mybooking username={user.name} onRemove={onRemove}></Mybooking>
              )}
            ></Route>
            <Route
              path="/profile"
              component={() => <Profileoption></Profileoption>}
            ></Route>
            <Route
              path="/orderdetails"
              component={() => (
                <Orderdetails
                  id={ordernumber}
                  username={user.name}
                ></Orderdetails>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
