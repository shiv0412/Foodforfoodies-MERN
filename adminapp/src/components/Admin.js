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
import Header from "./Header";
import { Dboyregister } from "./Registerdeliveryboy";

const Admin = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const diffToastdeleted = () => {
    toast.success("Removed Successfully", {
      autoClose: 3000,
      position: "top-center",
      hideProgressBar: false,
    });
  };

  const diffToastonStatus = () => {
    toast.success("Status Updated", {
      autoClose: 3000,
      position: "top-center",
      hideProgressBar: false,
    });
  };
  const onRemove = () => {
    diffToastdeleted();
  };
  const onUpdate = () => {
    diffToastonStatus();
  };

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

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/adminnotify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("notify", data);
  }, []);

  return (
    <div>
      <ToastContainer />
      <div
        style={{
          height: "12vh",
          width: "100%",
          backgroundColor: "#EBEDEF",
          borderBottom: "1px solid white",
        }}
      >
        <Header></Header>
      </div>
      <div class="container-fluid" style={{ margin: "0", padding: "0" }}>
        <div
          style={{
            width: "17%",
            float: "left",
            height: "88vh",
            backgroundColor: "#212F3D ",
          }}
        >
          <Sidebar></Sidebar>
        </div>
        <div
          style={{
            float: "right",
            height: "88vh",
            width: "83%",
            overflowY: "scroll",
          }}
        >
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Adminorders Update={onUpdate} Remove={onRemove}></Adminorders>
              )}
            ></Route>
            <Route
              exact
              path="/adminorders"
              component={() => (
                <Adminorders Update={onUpdate} Remove={onRemove}></Adminorders>
              )}
            ></Route>
            <Route
              exact
              path="/adminquery"
              component={() => (
                <Adminquery Update={onUpdate} Remove={onRemove}></Adminquery>
              )}
            ></Route>
            <Route
              exact
              path="/adminbooking"
              component={() => (
                <Adminbooking
                  Update={onUpdate}
                  Remove={onRemove}
                ></Adminbooking>
              )}
            ></Route>
            <Route
              exact
              path="/completed"
              component={() => <Completed Remove={onRemove}></Completed>}
            ></Route>
            <Route
              exact
              path="/completedbooking"
              component={() => (
                <Completedbooking Remove={onRemove}></Completedbooking>
              )}
            ></Route>

            {/* Item adding work */}
            <Route
              exact
              path="/additem"
              component={() => <AddProduct></AddProduct>}
            ></Route>
            <Route
              exact
              path="/dboyregister"
              component={() => <Dboyregister></Dboyregister>}
            ></Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default Admin;
