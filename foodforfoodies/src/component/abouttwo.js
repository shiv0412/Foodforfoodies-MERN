import react from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaBiking, FaAward, FaBroom } from "react-icons/fa";
import image from "../images/myimg.JPG";

function AboutTwo() {
  return (
    <div>
      <section id="section-about" class="about-section">
        <h1 className="values_title">Our Values</h1>
        <div class="all-sections">
          <div data-aos="fade-right" class="mini-section">
            <div class="hexagon">
              {/* <i class="fa fa-fighter-jet" aria-hidden="true"></i> */}
              <FaAward className="icon_value" />
            </div>
            <div class="text-mini-section">
              <h1>Quality</h1>
              <p>We only provide quality food products</p>
            </div>
          </div>
          <div data-aos="fade-up" class="mini-section">
            <div class="hexagon">
              {/* <i class="fa fa-window-restore" aria-hidden="true"></i> */}
              <FaBiking className="icon_value" />
            </div>
            <div class="text-mini-section">
              <h1>Delivery</h1>
              <p>Faster delivery across the city in every area</p>
            </div>
          </div>
          <div data-aos="fade-up" class="mini-section">
            <div class="hexagon">
              {/* <i class="fa fa-rocket" aria-hidden="true"></i> */}
              <FaBroom className="icon_value" />
            </div>
            <div class="text-mini-section">
              <h1>Cleaness</h1>
              <p>We focus on the cleaness and deliver clean items</p>
            </div>
          </div>
          <div data-aos="fade-left" class="mini-section">
            <div class="hexagon">
              {/* <i class="fa fa-bolt" aria-hidden="true"></i> */}
              <BsFillChatDotsFill className="icon_value" />
            </div>
            <div class="text-mini-section">
              <h1>Support</h1>
              <p>24x7 support for your orders and queries</p>
            </div>
          </div>
        </div>
        <div class="who-am-i">
          <div data-aos="zoom-in-up" class="image-me">
            <img src={image} height="500px" width="500px" />
          </div>
          <div class="all-who">
            <h1 data-aos="zoom-in-down">Founder Message</h1>
            <div class="div-para">
              <p
                data-aos="zoom-in-down"
                style={{ fontFamily: "cursive", paddingBottom: "100px" }}
              >
                Hello everyone, my name is Heithem Kacem and I am the founder of
                foodforfoodies from Noida, India.We have earned the trust and
                respect of customers for one simple reason—we have great people.
                They are experts in their fields. They bring a strong service
                ethos to everything they do. They take pride and ownership in
                the jobs they do. We bring passion, pride and experience
                together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AboutTwo;
