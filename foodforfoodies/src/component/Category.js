import react from "react";
import Carousel from "react-elastic-carousel";
import Card from "./Card";
import cheafspecial from "../images/cheafspecial.jpeg";
import veg from "../images/veg.jpg";
import nonveg from "../images/nonveg.jpg";
import todays from "../images/todayspecial.jpg";
import sidesdrinks from "../images/sides.jpg";
import maincourse from "../images/maincourse.jpeg";
import { Link } from "react-router-dom";

function Categories() {
  const breakPoints = [
    {
      width: 500,
      itemsToShow: 3,
    },
    {
      width: 768,
      itemsToShow: 3,
    },
    {
      width: 992,
      itemsToShow: 4,
    },
    {
      width: 1050,
      itemsToShow: 5,
    },
    {
      width: 1100,
      itemsToShow: 5,
    },
    {
      width: 1300,
      itemsToShow: 5,
    },
  ];
  return (
    <div className="mobile_categorgy_list">
      <div
        class="container"
        style={{ marginTop: "40px", marginBottom: "50px" }}
      >
        <Carousel breakPoints={breakPoints}>
          <Link exact to="/">
            <Card image={maincourse} title="Main Course" />
          </Link>
          <Link exact to="/veg">
            <Card image={veg} title="Veg" />
          </Link>
          <Link exact to="/nonveg">
            <Card image={nonveg} title="Non-Veg" />
          </Link>
          <Link exact to="/sides">
            <Card image={sidesdrinks} title="Sides,Drink" />
          </Link>
          <Card image={cheafspecial} title="Cheaf Special" />
          <Card image={todays} title="Today's Special" />
        </Carousel>
      </div>
    </div>
  );
}

export default Categories;
