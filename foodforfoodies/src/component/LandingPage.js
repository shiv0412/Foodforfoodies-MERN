import { useState, useEffect } from "react";
import Axios from "axios";
import { Route, Switch } from "react-router-dom";
import HeaderCurosal from "./HeaderCurosal";
import MainItems from "./MainItems";
import VegItem from "./VegItem";
import NonvegItem from "./NonvegItems";
import SideItems from "./SidesandDrinks";
import Booktable from "./Booktable";
import Address from "./address";
import Team from "./Team";
import Cheafspecial from "./Cheafspecial";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaTumblrSquare } from "react-icons/fa";
import banner5 from "../images/banner5.jpg";
import banner6 from "../images/banner6.jpg";
import banner3 from "../images/banner3.jpg";
import twobanner2 from "../images/2banner2.jpg";
import twobanner3 from "../images/2banner3.jpg";
import threebanner1 from "../images/threebanner1.jpg";
import threebanner2 from "../images/threebanner2.jpg";
import threebanner3 from "../images/threebanner3.jpg";
import threebanner4 from "../images/threebanner4.jpg";
import Categorydesk from "./Categorydesk";
import Lunchouter from "./Lunchouter";
import Breakfastouter from "./Breakfastouter";
import Dinnerouter from "./Dinnerouter";
import Alsolike from "./Youmaylike";

function LandingPage(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.s
    },
    desktoptwo: {
      breakpoint: { max: 1500, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.s
    },

    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [getdata, setGetdata] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4000/getproduct").then((response) => {
      setGetdata(response.data);
    });
  }, []);

  var freshArrival = getdata.filter((element) => {
    return element.category == "Fresh Arrival";
  });
  var lunch = getdata.filter((element) => {
    return element.category == "Lunch";
  });
  var breakfast = getdata.filter((element) => {
    return element.category == "Breakfast";
  });
  var dinner = getdata.filter((element) => {
    return element.category == "Dinner";
  });
  var likes = getdata.filter((element) => {
    return element.category == "Also Like";
  });

  return (
    <div>
      <HeaderCurosal></HeaderCurosal>
      <Cheafspecial products={freshArrival} onAdd={props.onAdd}></Cheafspecial>
      <div>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={FaTumblrSquare}
          autoPlaySpeed={1600}
          keyBoardControl={false}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="banner_wider_curosal"
        >
          <img src={banner3} width="100%" height="250px"></img>
          <img src={banner6} width="100%" height="250px"></img>
          <img src={banner5} width="100%" height="250px"></img>
        </Carousel>
      </div>
      <div class="container-fluid">
        <h2
          style={{
            textAlign: "",
            color: "#566573 ",
            fontFamily: "serif",
            borderBottom: "5px solid orangered",
            marginBottom: "30px",
            fontWeight: "bold",
            fontFamily: "fantasy",
            paddingTop: "40px",
          }}
        >
          Categories
        </h2>
      </div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <MainItems
              products={props.products}
              onAdd={props.onAdd}
            ></MainItems>
          )}
        ></Route>
        <Route
          exact
          path="/veg"
          component={() => (
            <VegItem products={props.vegproducts} onAdd={props.onAdd}></VegItem>
          )}
        ></Route>
        <Route
          exact
          path="/nonveg"
          component={() => (
            <NonvegItem
              products={props.nonvegproducts}
              onAdd={props.onAdd}
            ></NonvegItem>
          )}
        ></Route>
        <Route
          exact
          path="/sides"
          component={() => (
            <SideItems
              products={props.sideproducts}
              onAdd={props.onAdd}
            ></SideItems>
          )}
        ></Route>
      </Switch>
      <div className="landing_page_curosal_two">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={FaTumblrSquare}
          autoPlaySpeed={1600}
          keyBoardControl={false}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="banner_wider_curosal"
        >
          <img src={twobanner2} width="100%" height="250px"></img>
          <img src={twobanner3} width="100%" height="250px"></img>
        </Carousel>
      </div>
      <Lunchouter products={lunch} onAdd={props.onAdd}></Lunchouter>
      <Breakfastouter products={breakfast} onAdd={props.onAdd}></Breakfastouter>
      <Dinnerouter products={dinner} onAdd={props.onAdd}></Dinnerouter>
      <div className="landing_page_curosal_two">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={FaTumblrSquare}
          autoPlaySpeed={1600}
          keyBoardControl={false}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="banner_wider_curosal"
        >
          <div>
            <img src={threebanner1} width="50%" height="250px"></img>
            <img src={threebanner2} width="50%" height="250px"></img>
          </div>
          <img src={threebanner4} width="100%" height="250px"></img>
          <img src={threebanner3} width="100%" height="250px"></img>
        </Carousel>
      </div>
      <Alsolike products={likes} onAdd={props.onAdd}></Alsolike>
      <Booktable onBooking={props.onBook}></Booktable>
      <Address></Address>
      <Team></Team>
    </div>
  );
}
export default LandingPage;
