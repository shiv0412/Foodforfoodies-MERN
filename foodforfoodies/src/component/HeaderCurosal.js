import React from "react";

export const HeaderCurosal = () => {
  return (
    <div>
      <div class="container-fluid" style={{ padding: "0", marginTop: "100px" }}>
        <div class="row" style={{ padding: "0", margin: "0" }}>
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
            style={{ padding: "0" }}
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="info">
                  <h1 style={{ fontFamily: "serif" }} className="curosal_title">
                    <span className="curosal_title">Delight in Every Bite</span>
                  </h1>
                  <p>The only thing we love more than food is you!</p>
                  <button className="Order_Button">Order Now</button>
                </div>
              </div>
              <div class="carousel-item">
                <div class="info">
                  <h1 style={{ fontFamily: "serif" }}>
                    <span className="curosal_title"> The Taste Place</span>
                  </h1>
                  <p>Wake up your taste buds.</p>
                  <button className="Order_Button">Order Now</button>
                </div>
              </div>
              <div class="carousel-item">
                <div class="info">
                  <h1 style={{ fontFamily: "serif" }} className="curosal_title">
                    <span className="curosal_title"> Foodies Best Place</span>
                  </h1>
                  <p>Rain or shine, it’s time to dine</p>
                  <button className="Order_Button">Order Now</button>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="ture"
              ></span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderCurosal;
