import "./App.css";
import Admin from "./components/Admin";
import Adminlogin from "./components/Adminlogin";
import { Switch, Route } from "react-router-dom";
import Adminorders from "./components/Adminorders";
import AddProduct from "./components/Addproduct";
import { useState, useEffect } from "react";

function App() {
  // // Rough work

  // const [seconds, setSeconds] = useState(0);
  // const [isActive, setIsActive] = useState(true);

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  // function reset() {
  //   setSeconds(0);
  //   setIsActive(false);
  // }

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds((seconds) => seconds + 1);
  //     }, 50000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Admin></Admin>}></Route>
        <Route
          exact
          path="/adminorders"
          component={() => <Admin></Admin>}
        ></Route>
        <Route
          exact
          path="/adminquery"
          component={() => <Admin></Admin>}
        ></Route>
        <Route
          exact
          path="/adminbooking"
          component={() => <Admin></Admin>}
        ></Route>
        <Route
          exact
          path="/adminlogin"
          component={() => <Adminlogin></Adminlogin>}
        ></Route>
        <Route
          exact
          path="/completed"
          component={() => <Admin></Admin>}
        ></Route>
        <Route
          exact
          path="/completedbooking"
          component={() => <Admin></Admin>}
        ></Route>
      </Switch>
      {/* <Adminlogin></Adminlogin>
      <Admin></Admin> */}

      {/* item adding work  */}
      <Route exact path="/additem" component={() => <Admin></Admin>}></Route>
      <Route
        exact
        path="/dboyregister"
        component={() => <Admin></Admin>}
      ></Route>
    </div>
  );
}

export default App;
