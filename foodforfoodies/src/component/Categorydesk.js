import React, { Component, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";
import cheafspecial from "../images/cheafspecial.jpeg";
import veg from "../images/veg.jpg";
import nonveg from "../images/nonveg.jpg";
import todays from "../images/todayspecial.jpg";
import sidesdrinks from "../images/sides.jpg";
import maincourse from "../images/maincourse.jpeg";
import { Link } from "react-router-dom";

export default function VerticalMode(props) {
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };
  const setFilter = (e) => {
    e.preventDefault();
    props.filterFunction(min, max);
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <Link exact to="/">
            <Card image={maincourse} title="Main Course" />
          </Link>
        </div>
        <div>
          <Link exact to="/veg">
            <Card image={veg} title="Veg" />
          </Link>
        </div>
        <div>
          <Link exact to="/nonveg">
            <Card image={nonveg} title="Non-Veg" />
          </Link>
        </div>
        <div>
          <Link exact to="/sides">
            <Card image={sidesdrinks} title="Sides,Drink" />
          </Link>
        </div>
        <div>
          <Card image={cheafspecial} title="Cheaf Special" />
        </div>
        <div>
          <Card image={todays} title="Today's Special" />
        </div>
      </Slider>
      <div className="filter_item_holder">
        <form>
          <table>
            <tr>
              <td>
                <span className="item_filter_title">Price</span>
              </td>
              <td>
                {" "}
                <input
                  type="number"
                  placeholder="min"
                  value={min}
                  onChange={(e) => {
                    setMin(e.target.value);
                  }}
                  className="filter_input"
                />
                <input
                  type="number"
                  placeholder="max"
                  value={max}
                  onChange={(e) => {
                    setMax(e.target.value);
                  }}
                  className="filter_input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
            </tr>
            <tr>
              <td>
                <span className="item_filter_title">Discount</span>
              </td>
              <td>
                {" "}
                <input
                  type="number"
                  placeholder="min"
                  className="filter_input"
                />
                <input
                  type="number"
                  placeholder="max"
                  className="filter_input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
            </tr>
          </table>
          <input
            type="submit"
            value="Filter"
            class="btn_login_form"
            onClick={setFilter}
            className="filter_input_button"
          />
        </form>
      </div>
    </div>
  );
}
