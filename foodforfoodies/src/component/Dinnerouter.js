import React from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import Categories from "../component/Category";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import galleryitemdata from "../Galleryitemdata";
import { FaTumblrSquare } from "react-icons/fa";

export default function Dinnerouter(props) {
  const { products, onAdd } = props;
  products.reverse();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.s
    },
    desktoptwo: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.s
    },

    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div
      class="container-fluid"
      style={{
        backgroundColor: "",
        paddingBottom: "20px",
        paddingTop: "20px",
        marginTop: "20px",
      }}
    >
      <div>
        <h2
          style={{
            textAlign: "",
            color: "#566573 ",
            fontFamily: "serif",
            borderBottom: "5px solid orangered",
            marginBottom: "30px",
            fontWeight: "bold",
            fontFamily: "fantasy",
            paddingBottom: "3px",
          }}
        >
          Dinner
          <Link to="/dinner">
            <button className="view_all_button">View All</button>
          </Link>
        </h2>

        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.slice(0, 10).map((product) => (
            <div style={{ marginRight: "10%" }}>
              <div
                className="food_item_container"
                style={{
                  float: "none",
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
                <div className="item_image_container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product_image"
                  />
                </div>

                <h3 className="product_title">
                  {product.name} <br />
                  &#9733;&#9733;&#9733;&#9733;&#9734;
                </h3>
                <h4 className="product_price">&#8377; {product.price}</h4>

                <button className="product_add" onClick={() => onAdd(product)}>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </Carousel>
        {/* <div className="row"> */}
        {/* {products.map((product) => (
        <Product key={product._id} product={product} onAdd={onAdd}></Product>
      ))} */}
        {/* </div> */}
      </div>
    </div>
  );
}
