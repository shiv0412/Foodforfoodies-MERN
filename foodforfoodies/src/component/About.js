import react from "react";
import AboutTwo from "./abouttwo";
import aboutone from "../images/abouttwo.jpg";
import abouttwo from "../images/aboutpage.jpg";

function About() {
  return (
    <div>
      <section class="section3foodies" id="OurMissionfoodies">
        <h1 className="about_main_title_food"> Read About Us</h1>
        <table>
          <tr>
            <td>
              <img src={aboutone} alt="AboutUs" />
            </td>
            <td style={{ paddingLeft: "100px" }}>
              <span class="titlefoodies" style={{ color: "orangered" }}>
                Our Vision
              </span>
              <span class="sub-titlefoodies">
                Lorem ipsum dolor sit amet, consectetur adi
              </span>
              <p>
                Since our modest beginnings in 2005 with a little space in
                Noida’s stylish southe extension locale, ‘FoodForFoodies’ ‘s
                development has been enlivened with the energy to cook and serve
                solid, Indian-roused takeout food. In contrast to other Indian
                eateries, ‘FoodForFoodies’ was made with the explicit
                expectation to appear as something else.
              </p>
              <p>
                We realize numerous individuals love Indian sustenance, yet a
                large number of them loathe or are unconscious of the regularly
                unfortunate fixings that make run-of-the-mill Indian nourishment
                taste so great. Our menu highlights things that utilization the
                sound and fragrant flavors, however forgets the stuffing ghee,
                spread, oil, and overwhelming cream.
              </p>
              <a class="btn2foodies">Know More</a>
            </td>
          </tr>
        </table>
      </section>

      <section class="section3foodies" id="OurMissionfoodies">
        <table>
          <tr>
            <td>
              <span class="titlefoodies" style={{ color: "orangered" }}>
                Our Mission
              </span>
              <span class="sub-titlefoodies">
                Lorem ipsum dolor sit amet, consectetur adi
              </span>
              <p>
                ‘FoodForFoodies’ has developed to incorporate four superb
                takeout areas in Noida with additional to come sooner rather
                than later. Our group takes pride in the way that we can furnish
                our new and faithful clients with extraordinary tasting
                Indian-roused nourishment that is not normal for that at some
                other Indian eatery you visit. We perceive that a few people are
                as yet searching for the run of the mill Indian nourishment, and
                that is fine with us.
              </p>
              <p>
                Our disclaimer is that on the off chance that you’re
                anticipating overwhelming, slick, undesirable Indian
                nourishment, ‘FoodForFoodies’ isn’t the place for you.
              </p>
              <a class="btn2foodies">Know More</a>
            </td>
            <td>
              <img src={abouttwo} alt="AboutUs" />
            </td>
          </tr>
        </table>
      </section>
      <AboutTwo></AboutTwo>
    </div>
  );
}
export default About;
