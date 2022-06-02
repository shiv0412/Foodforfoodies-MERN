import React from "react";
import { BsFillBagFill } from "react-icons/bs";
import { BsFillStopwatchFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Profileoption = () => {
  return (
    <div className="profile_option_main_container_user">
      <div class="container profile_options_main_holder">
        <div class="row">
          <div class="col-sm">
            <Link to="/myorders">
              <div className=" profile_options">
                <BsFillBagFill className="icons_options"></BsFillBagFill>
                <p>My Orders</p>
              </div>
            </Link>
          </div>
          <div class="col-sm">
            <Link to="/mybooking">
              <div className=" profile_options">
                <BsFillStopwatchFill className="icons_options"></BsFillStopwatchFill>
                <p> My Bookings</p>
              </div>
            </Link>
          </div>
          <div class="col-sm ">
            <div className=" profile_options">
              <BsFillPersonPlusFill className="icons_options"></BsFillPersonPlusFill>
              <p>Edit Profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profileoption;
