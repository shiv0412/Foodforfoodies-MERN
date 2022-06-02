import "./App.css";

import { useState, useEffect } from "react";
import { Route, Swtich, Switch, useHistory } from "react-router-dom";
import MainHeader from "./component/MainHeader";
// import HeaderCurosal from "./component/HeaderCurosal";
import Footer from "./component/Footer";
// import MainItems from "./component/MainItems";
// import VegItem from "./component/VegItem";
// import NonvegItem from "./component/NonvegItems";
// import SideItems from "./component/SidesandDrinks";
// // import Categories from "./component/Category";
// import Booktable from "./component/Booktable";
import Basket from "./component/Basket";
import mainitemdata from "./MainItemdata";
import vegitemdata from "./VegItemdata";
import nonvegitemdata from "./Nonvegitemdata";
import sidesitemdata from "./Sidesitemdata";
// import Address from "./component/address";
// import Team from "./component/Team";
import About from "./component/About";
import LandingPage from "./component/LandingPage";
import ContactUs from "./component/ContactUs";
import Gallery from "./component/Gallery";
import TopInfo from "./component/Topinfo";
import ShippingForm from "./component/ShippingForm";
import Login from "./component/Login";
import SignUp from "./component/Signup";
import Profile from "./component/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UID from "uniquebrowserid";
import Axios from "axios";
import Lunchall from "./component/Lunchall";
import Breakfastall from "./component/Breakfastall";
import Dinnerall from "./component/Dinnerall";

function App() {
  const { products } = mainitemdata;
  const { vegproducts } = vegitemdata;
  const { nonvegproducts } = nonvegitemdata;
  const { sideproducts } = sidesitemdata;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    diffToastonAdd();
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
    diffToastonRemoveitem();
  };

  const diffToastonAdd = () => {
    toast.success("Item added to your Cart", {
      autoClose: 2000,
      position: "top-center",
      hideProgressBar: false,
    });
  };
  const diffToastonRemoveitem = () => {
    toast.warning("Item removed", {
      autoClose: 2000,
      position: "top-center",
      hideProgressBar: false,
    });
  };

  const onOrder = () => {
    const empty = [];
    setCartItems(empty);
  };

  const diffToast = () => {
    toast.success("Registration Successfull", {
      autoClose: 2000,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const diffToastlogin = () => {
    toast.warning("Welcome,Logged In", {
      autoClose: 1500,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const diffToastorder = () => {
    toast.success("Order Placed Successfully", {
      autoClose: 2000,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const diffToastlogout = () => {
    toast.info("Logged Out...", {
      autoClose: 2000,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const diffToastBooked = () => {
    toast.success("Hurrayyy..Booking Successfull", {
      autoClose: 3000,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const diffToastSend = () => {
    toast.warning("Sent..,we revert back to you soon", {
      autoClose: 2500,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const onSignup = () => {
    diffToast();
  };

  const onLogin = () => {
    diffToastlogin();
  };

  const onPlaced = () => {
    diffToastorder();
  };

  const onLogout = () => {
    diffToastlogout();
  };

  const onBook = () => {
    diffToastBooked();
  };

  const onSend = () => {
    diffToastSend();
  };

  const [bCheck, setBcheck] = useState();

  const bUpdate = () => {
    setBcheck(false);
  };

  const logoutButton = () => {
    setBcheck(true);
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
      []
    );

    const data = await res.json();
    if (res.status === 400 || !data) {
      setBcheck(true);
    } else {
      setBcheck(false);
    }
  }, []);

  const [menuItems, setMenuitems] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/getproduct").then((response) => {
      setMenuitems(response.data);
    });
  }, [App]);

  var Lunch = menuItems.filter((element) => {
    return element.category == "Lunch";
  });

  var Breakfast = menuItems.filter((element) => {
    return element.category == "Breakfast";
  });

  var Dinner = menuItems.filter((element) => {
    return element.category == "Dinner" || element.category == "Lunch";
  });

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
  //     }, 20000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  return (
    <div>
      {/* <TopInfo></TopInfo> */}
      <MainHeader
        countCartItems={cartItems.length}
        onLogout={onLogout}
        buttonCheck={bCheck}
        onAdd={onAdd}
        setoutButton={logoutButton}
      ></MainHeader>
      <ToastContainer />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <LandingPage
              products={products}
              vegproducts={vegproducts}
              nonvegproducts={nonvegproducts}
              sideproducts={sideproducts}
              onAdd={onAdd}
              onBook={onBook}
            ></LandingPage>
          )}
        ></Route>
        <Route
          exact
          path="/veg"
          component={() => (
            <LandingPage
              products={products}
              vegproducts={vegproducts}
              nonvegproducts={nonvegproducts}
              sideproducts={sideproducts}
              onAdd={onAdd}
              onBook={onBook}
            ></LandingPage>
          )}
        ></Route>
        <Route
          exact
          path="/nonveg"
          component={() => (
            <LandingPage
              products={products}
              vegproducts={vegproducts}
              nonvegproducts={nonvegproducts}
              sideproducts={sideproducts}
              onAdd={onAdd}
              onBook={onBook}
            ></LandingPage>
          )}
        ></Route>
        <Route
          exact
          path="/sides"
          component={() => (
            <LandingPage
              products={products}
              vegproducts={vegproducts}
              nonvegproducts={nonvegproducts}
              sideproducts={sideproducts}
              onAdd={onAdd}
              onBook={onBook}
            ></LandingPage>
          )}
        ></Route>
        {/* product adding work */}

        {/* product adding work ends */}
        <Route
          exact
          path="/cart"
          component={() => (
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
            ></Basket>
          )}
        ></Route>
        <Route
          exact
          path="/shippingform"
          component={() => (
            <ShippingForm
              cartItems={cartItems}
              onOrder={onOrder}
              onPlaced={onPlaced}
            ></ShippingForm>
          )}
        ></Route>

        <Route path="/about" component={About}></Route>
        <Route
          path="/contactus"
          component={() => <ContactUs onSend={onSend}></ContactUs>}
        ></Route>
        <Route path="/gallery" component={Gallery}></Route>
        <Route
          path="/login"
          component={() => <Login onLogin={onLogin} onCheck={bUpdate}></Login>}
        ></Route>
        <Route
          path="/signup"
          component={() => <SignUp onSignup={onSignup}></SignUp>}
        ></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/myorders" component={Profile}></Route>
        <Route path="/mybooking" component={Profile}></Route>
        <Route path="/orderdetails" component={Profile}></Route>
        <Route
          path="/lunch"
          component={() => <Lunchall products={Lunch} onAdd={onAdd}></Lunchall>}
        ></Route>
        <Route
          path="/breakfast"
          component={() => (
            <Breakfastall products={Breakfast} onAdd={onAdd}></Breakfastall>
          )}
        ></Route>
        <Route
          path="/dinner"
          component={() => (
            <Dinnerall products={Dinner} onAdd={onAdd}></Dinnerall>
          )}
        ></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}
export default App;
