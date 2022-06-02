import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaTumblrSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Activecurosal(props) {
  console.log("data on homecurosal", props.data);
  var email = props.userdata.email;
  // const [data, setData] = useState([]);
  var active = props.data.filter((element) => {
    return element.d_email == email && element.status !== "Completed";
  });
  var length = active.length;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.s
      partialVisibilityGutter: 25,
    },
    desktoptwo: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.s
      partialVisibilityGutter: 20,
    },

    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 25,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
    },
  };
  return (
    <div>
      {length > 0 ? (
        <div>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            arrows={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            partialVisible={true}
          >
            {/* <div>
            <Recentouter orderdata={props.allorderdata}></Recentouter>
          </div> */}

            {active.map((cvalue) => {
              return (
                <Link
                  to="/active"
                  style={{ textDecoration: "none", color: "#2C3E50" }}
                >
                  <div className="order_recent_holder_curosal">
                    <p>
                      Order Id :{" "}
                      <span style={{ color: "orangered" }}>
                        {cvalue.orderno}
                      </span>
                    </p>
                    <p>&#9787;&nbsp; &nbsp;{cvalue.cust_name}</p>
                    <p>&#9742;&nbsp; &nbsp;{cvalue.cust_phone}</p>
                    <p>&#9751;&nbsp;&nbsp;&nbsp;&nbsp;{cvalue.address}</p>
                    <p>
                      &#8377;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cvalue.total_price}
                    </p>
                    <p
                      className="live_status"
                      style={{ padding: "5px 0px", fontWeight: "bold" }}
                    >
                      Status : {cvalue.status}
                    </p>
                    {/* <button>
                  <span className="button_order_handler_one">Accept</span>
                </button>
                <button>
                  <span className="button_order_handler_two">View</span>
                </button> */}
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="order_recent_holder_curosal order_recent_holder_curosal_no_value">
          <p style={{ padding: "10px 0px", margin: "0", color: "grey" }}>
            No Active Order...
          </p>
        </div>
      )}
    </div>
  );
}
