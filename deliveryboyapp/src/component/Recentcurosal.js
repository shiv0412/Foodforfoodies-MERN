import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaTumblrSquare } from "react-icons/fa";
import Recentouter from "./Recentouter";
import { useHistory, Link } from "react-router-dom";

export default function Recentcurosal(props) {
  const history = useHistory();
  var data = props.allorderdata;
  var length = data.length;

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

  const addtoActive = async (orderno) => {
    const res = await fetch("http://localhost:5001/addtodeliveryboy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderno: orderno,
        name: props.deliveryboydata.name,
        email: props.deliveryboydata.email,
        phone: props.deliveryboydata.phone,
        address: props.deliveryboydata.address,
        deliveryboyid: props.deliveryboydata.deliveryboyid,
      }),
    });
    // props.Remove();
    history.push("/main");
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

            {data.map((cvalue) => {
              return (
                <div className="order_recent_holder_curosal">
                  <p>
                    Order Id :{" "}
                    <span style={{ color: "orangered" }}>{cvalue.orderno}</span>
                  </p>
                  <p>&#9673;&nbsp; &nbsp;{cvalue.cust_name}</p>
                  <p>&#9673;&nbsp; &nbsp;{cvalue.cust_phone}</p>
                  <p>&#9673;&nbsp; &nbsp;{cvalue.address}</p>
                  <button onClick={() => addtoActive(cvalue.orderno)}>
                    <span className="button_order_handler_one">Accept</span>
                  </button>
                  <Link to="/recents">
                    <button className="button_order_handler_two">View</button>
                  </Link>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="order_recent_holder_curosal order_recent_holder_curosal_no_value">
          <p style={{ padding: "10px 0px", margin: "0", color: "grey" }}>
            No Recent Order...
          </p>
        </div>
      )}
    </div>
  );
}
