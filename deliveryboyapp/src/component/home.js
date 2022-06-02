import { useState, useEffect } from "react";
import UID from "uniquebrowserid";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import dperson from "../images/dperson.jpg";
import Insights from "./Insights";
import Recentcurosal from "./Recentcurosal";
import Activecurosal from "./Activecurosal";
import Completedcurosal from "./Completedcurosal";
import Main from "./Main";
import Recentordersall from "./Recentordersall";
import Activeorderall from "./Activeorderall";
import Completedorderall from "./Completedorderall";
import Maprider from "./Maprider";

const Home = () => {
  const [user, setUser] = useState({});
  const [recentcount, setRecentcount] = useState(0);
  const [activecount, setActivecount] = useState();
  const history = useHistory();
  var allorderdata;
  const [alldata, setalldata] = useState([]);
  const [activedata, setActivedata] = useState([]);

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

  // useEffect(async () => {
  //   const res = await fetch("http://localhost:5001/allorderdatadelivery", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   // console.log("response", data);
  //   // allorderdata = data;
  //   // console.log("All order data", allorderdata);
  //   setRecentcount(data.length);
  //   setalldata(data);
  // }, []);

  // useEffect(async () => {
  //   const res = await fetch("http://localhost:5001/activeorderdatadelivery", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   // console.log("response", data);
  //   // allorderdata = data;
  //   // console.log("All order data", allorderdata);
  //   setActivedata(data);
  // }, []);

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
          {/* <div className="delivery_boy_info_holder">
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
            <Insights
              name="Completed"
              userdata={user}
              orderdata={alldata}
              color="purple"
            ></Insights>
          </div>
          <div className="delivery_boy_recent_data_holder">
            <div
              style={{ borderBottom: "2px solid grey", position: "relative" }}
            >
              <h4 className="main_page_component_title">Recent Orders</h4>
              <button
                className="main_page_component_button"
                style={{ position: "absolute", right: "0", top: "0" }}
              >
                View All
              </button>
            </div>
            <Recentcurosal
              deliveryboydata={user}
              allorderdata={alldata}
            ></Recentcurosal>
          </div>
          <div className="delivery_boy_active_data_holder">
            <div
              style={{ borderBottom: "2px solid grey", position: "relative" }}
            >
              <h4 className="main_page_component_title">Active Orders</h4>
              <button
                className="main_page_component_button"
                style={{ position: "absolute", right: "0", top: "0" }}
              >
                View All
              </button>
            </div>

            <Activecurosal data={activedata} userdata={user}></Activecurosal>
          </div>

          <div className="delivery_boy_active_data_holder">
            <div
              style={{ borderBottom: "2px solid grey", position: "relative" }}
            >
              <h4 className="main_page_component_title">Completed Orders</h4>
              <button
                className="main_page_component_button"
                style={{ position: "absolute", right: "0", top: "0" }}
              >
                View All
              </button>
            </div>
            <Completedcurosal allorderdata={alldata}></Completedcurosal>
          </div> */}
          <Switch>
            <Route exact path="/" component={() => <Main></Main>}></Route>
            <Route exact path="/main" component={() => <Main></Main>}></Route>
            <Route
              exact
              path="/recents"
              component={() => (
                <Recentordersall deliveryboydata={user}></Recentordersall>
              )}
            ></Route>
            <Route
              exact
              path="/active"
              component={() => (
                <Activeorderall deliveryboydata={user}></Activeorderall>
              )}
            ></Route>
            <Route
              exact
              path="/completed"
              component={() => (
                <Completedorderall deliveryboydata={user}></Completedorderall>
              )}
            ></Route>
            <Route
              exact
              path="/maprider"
              component={() => <Maprider></Maprider>}
            ></Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default Home;
