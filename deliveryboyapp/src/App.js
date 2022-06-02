import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./component/deliverypersonlogin";
import Home from "./component/home";
import Recentordersall from "./component/Recentordersall";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Home></Home>}></Route>
        <Route exact path="/main" component={() => <Home></Home>}></Route>
        <Route exact path="/login" component={() => <Login></Login>}></Route>
        <Route exact path="/recents" component={() => <Home></Home>}></Route>
        <Route exact path="/active" component={() => <Home></Home>}></Route>
        <Route exact path="/completed" component={() => <Home></Home>}></Route>
        <Route exact path="/maprider" component={() => <Home></Home>}></Route>
      </Switch>
    </div>
  );
}

export default App;
