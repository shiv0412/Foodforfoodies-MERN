import react from "react";
import backimage from "../images/resback.jpg";
import cheafone from "../images/bcheafone.png";
import cheaftwo from "../images/ncheaftwo.png";
import cheafthree from "../images/ncheafthree.png";
import cheaffour from "../images/ncheaffour.png";

function Team() {
  return (
    <div className="teams_holder">
      <h1 className="team_title">Our Chefs</h1>
      <p className="team_tagline">
        We deliver quality food prepared by professionals{" "}
      </p>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="our-team">
              <div class="picture">
                <img class="img-fluid" src={cheafone} />
              </div>
              <div class="team-content">
                <h3 class="name">Anjum Anand</h3>
                <h4 class="title">Head Chef</h4>
              </div>
              <ul class="social">
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-facebook"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-twitter"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-google-plus"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-linkedin"
                    aria-hidden="true"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="our-team">
              <div class="picture">
                <img class="img-fluid" src={cheaftwo} />
              </div>
              <div class="team-content">
                <h3 class="name">Surjan Singh</h3>
                <h4 class="title">Veg Chef</h4>
              </div>
              <ul class="social">
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-facebook"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-twitter"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-google-plus"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-linkedin"
                    aria-hidden="true"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="our-team">
              <div class="picture">
                <img class="img-fluid" src={cheafthree} />
              </div>
              <div class="team-content">
                <h3 class="name">Garima Arora</h3>
                <h4 class="title">Chef</h4>
              </div>
              <ul class="social">
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-facebook"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-twitter"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-google-plus"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-linkedin"
                    aria-hidden="true"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="our-team">
              <div class="picture">
                <img class="img-fluid" src={cheaffour} />
              </div>
              <div class="team-content">
                <h3 class="name">Kunal Kapur</h3>
                <h4 class="title">Head Chef</h4>
              </div>
              <ul class="social">
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-facebook"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-twitter"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-google-plus"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="fa fa-linkedin"
                    aria-hidden="true"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Team;
