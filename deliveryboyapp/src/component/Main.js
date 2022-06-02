import { useState, useEffect } from "react";
import UID from "uniquebrowserid";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dperson from "../images/dperson.jpg";
import Insights from "./Insights";
import Recentcurosal from "./Recentcurosal";
import Activecurosal from "./Activecurosal";
import Completedcurosal from "./Completedcurosal";
import Insightstwo from "./insighttwo";

const Main = () => {
  const [user, setUser] = useState({});
  const [recentcount, setRecentcount] = useState(0);
  const history = useHistory();
  const [alldata, setalldata] = useState([]);
  const [activedata, setActivedata] = useState([]);
  const [completedData, setCompleteddata] = useState([]);

  useEffect(async () => {
    var uniquekey = new UID().completeID();
    const res = await fetch(
      "http://localhost:5001/deliveryboyhome",
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

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/allorderdatadelivery", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("response", data);
    // allorderdata = data;
    // console.log("All order data", allorderdata);
    setRecentcount(data.length);
    data.reverse();
    setalldata(data);
  }, []);

  useEffect(async () => {
    const res = await fetch("http://localhost:5001/activeorderdatadelivery", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("response", data);
    // allorderdata = data;
    // console.log("All order data", allorderdata);
    var completed = data.filter((element) => {
      return element.status == "Completed";
    });
    data.reverse();
    setActivedata(data);
    setCompleteddata(completed);
  }, []);

  return (
    <div>
      <div className="delivery_boy_info_holder">
        <div className="delivery_boy_pic_container_outer">
          <p className="hr_pic_sideer">
            <div className="delivery_boy_pic_holder">
              <img
                src={dperson}
                height="85px"
                width="85px"
                style={{
                  borderRadius: "50%",
                  border: "2px solid orangered",
                }}
              />
            </div>
          </p>
        </div>
        <div className="delivery_boy_info_text">
          <p className="delivery_boy_info_text_name">{user.name}</p>
          <p className="delivery_boy_info_text_phone">+91 {user.phone}</p>
        </div>
      </div>
      <div className="delivery_boy_insight_holder">
        {/* <Insights
              name="Recent"
              userdata={user}
              orderdata={alldata}
              color="blue"
            ></Insights> */}
        <div className="insight_main">
          <div
            className="dboy_insights_data_holder"
            style={{
              borderColor: "blue",
            }}
          >
            <h3 className="insights_header_dboy">Recent Orders</h3>
            <p className="insights_number_dboy">{recentcount}</p>
          </div>
        </div>
        <Insights
          name="Active"
          userdata={user}
          orderdata={activedata}
          color="green"
        ></Insights>
        <Insightstwo
          name="Completed"
          userdata={user}
          orderdata={activedata}
          color="purple"
        ></Insightstwo>
      </div>
      <div className="delivery_boy_recent_data_holder">
        <div style={{ borderBottom: "2px solid grey", position: "relative" }}>
          <h4 className="main_page_component_title">Recent Orders</h4>
          <Link to="/recents">
            <button
              className="main_page_component_button"
              style={{ position: "absolute", right: "0", top: "0" }}
            >
              View All
            </button>
          </Link>
        </div>
        <Recentcurosal
          deliveryboydata={user}
          allorderdata={alldata}
        ></Recentcurosal>
      </div>
      <div className="delivery_boy_active_data_holder">
        <div style={{ borderBottom: "2px solid grey", position: "relative" }}>
          <h4 className="main_page_component_title">Active Orders</h4>
          <Link to="/active">
            <button
              className="main_page_component_button"
              style={{ position: "absolute", right: "0", top: "0" }}
            >
              View All
            </button>
          </Link>
        </div>

        <Activecurosal data={activedata} userdata={user}></Activecurosal>
      </div>

      <div className="delivery_boy_active_data_holder">
        <div style={{ borderBottom: "2px solid grey", position: "relative" }}>
          <h4 className="main_page_component_title">Completed Orders</h4>

          <Link to="/completed">
            <button
              className="main_page_component_button"
              style={{ position: "absolute", right: "0", top: "0" }}
            >
              View All
            </button>
          </Link>
        </div>
        <Completedcurosal
          userdata={user}
          allorderdata={completedData}
        ></Completedcurosal>
      </div>
    </div>
  );
};
export default Main;
