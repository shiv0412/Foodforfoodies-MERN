import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import galleryitemdata from "../Galleryitemdata";
import React from "react";
import { FaTumblrSquare } from "react-icons/fa";
import gallerypartydata from "../Galleryfoodpartydata";

function Party() {
  const { gallerypartyproducts } = gallerypartydata;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3, // optional, default to 1.s
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div class="container">
      <h1 className="gallery_item_title"> PartyAndFood</h1>
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
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {gallerypartyproducts.map((product) => (
          <div>
            <img
              key={product.id}
              src={product.image}
              className="gallery_img_item"
            ></img>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
export default Party;
