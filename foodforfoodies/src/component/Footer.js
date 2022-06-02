import React from "react";
import Facebook from "../images/facebook.png";
import Twitter from "../images/twitter.png";
import Instagram from "../images/instagram.png";
import Google from "../images/google-plus.png";

export const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        clear: "both",
        marginTop: "100px",
      }}
    >
      <footer class="page-footer font-small stylish-color-dark pt-4">
        <div class="container text-center text-md-left">
          <div class="row">
            <div class="col-md-4 mx-auto">
              <h4
                class="font-weight-bold text-uppercase mt-3 mb-4"
                style={{
                  color: "orangered",
                  fontFamily: "fantasy",
                }}
              >
                FoodForFoodies
              </h4>
              <p>
                FoodForFoodies, a brand, associated today with traditional
                Indian sweets, snacks and Indian food.Today, we are proud to
                serve millions of customers every day with diverse range of food
                products.
              </p>
            </div>

            <hr class="clearfix w-100 d-md-none" />

            <div class="col-md-2 mx-auto">
              <h5
                class="font-weight-bold text-uppercase mt-3 mb-4"
                style={{ color: "orangered" }}
              >
                Services
              </h5>

              <ul class="list-unstyled">
                <li>
                  <a href="#!" className="Footer_Links">
                    Breakfast
                  </a>
                </li>
                <li>
                  <a href="#!" className="Footer_Links">
                    Lunch
                  </a>
                </li>
                <li>
                  <a href="#!" className="Footer_Links">
                    Dinner
                  </a>
                </li>
                <li>
                  <a href="#!" className="Footer_Links">
                    Book Table
                  </a>
                </li>
              </ul>
            </div>

            <hr class="clearfix w-100 d-md-none" />

            <div class="col-md-2 mx-auto">
              <h5
                class="font-weight-bold text-uppercase mt-3 mb-4"
                style={{ color: "orangered" }}
              >
                About
              </h5>

              <ul class="list-unstyled">
                <li>
                  <a href="#!" className="Footer_Links">
                    Company
                  </a>
                </li>
                <li>
                  <a href="#!" className="Footer_Links">
                    Location
                  </a>
                </li>
                <li>
                  <a href="#!" className="Footer_Links">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#!" className="Footer_Links">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            <hr class="clearfix w-100 d-md-none" />

            <div class="col-md-2 mx-auto">
              <h5
                class="font-weight-bold text-uppercase mt-3 mb-4"
                style={{ color: "orangered" }}
              >
                Address
              </h5>

              <ul class="list-unstyled">
                <li>
                  <p>Phone: 900000000</p>
                </li>
                <li>
                  <p>798 South Park Avenue, Delhi, INDIA</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr />

        <ul class="list-unstyled list-inline text-center">
          <li class="list-inline-item">
            <a class="btn-floating btn-fb mx-1">
              <img src={Facebook} className="social_icon"></img>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="btn-floating btn-tw mx-1">
              <img src={Google} className="social_icon"></img>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="btn-floating btn-gplus mx-1">
              <img src={Instagram} className="social_icon"></img>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="btn-floating btn-li mx-1">
              <img src={Twitter} className="social_icon"></img>
            </a>
          </li>
        </ul>

        <div class="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="" className="Footer_Links">
            FoodForFoodies.com
          </a>
        </div>
      </footer>
      <hr />
    </div>
  );
};
export default Footer;
