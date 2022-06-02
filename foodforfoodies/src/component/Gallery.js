import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";

import Latest from "./Latestgalleryitems";
import Infra from "./Galleryinfra";
import Party from "./FoodandParty";

export default function Gallery() {
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        class="container-fluid"
        style={{ backgroundColor: "black", padding: "100px 0px 100px 0px" }}
      >
        <div style={{ width: "75%", margin: "auto" }}>
          <MDBCarousel
            showIndicators
            showControls
            fade
            style={{ height: "60vh" }}
          >
            <MDBCarouselInner style={{ height: "60vh" }}>
              <MDBCarouselItem itemId={0}>
                <MDBCarouselElement
                  style={{ height: "60vh" }}
                  src="https://media.architecturaldigest.in/wp-content/uploads/2019/02/Talli-Turmeric-restaurant-Worli-Mumbai.jpg"
                  alt="..."
                />
                <MDBCarouselCaption>
                  <h5></h5>
                  <p></p>
                </MDBCarouselCaption>
              </MDBCarouselItem>

              <MDBCarouselItem itemId={1}>
                <MDBCarouselElement
                  style={{ height: "60vh" }}
                  src="https://i.pinimg.com/originals/96/e2/aa/96e2aa36e64a7314aabdffce8f315087.jpg"
                  alt="..."
                />
                <MDBCarouselCaption>
                  <h5></h5>
                  <p></p>
                </MDBCarouselCaption>
              </MDBCarouselItem>

              <MDBCarouselItem itemId={2}>
                <MDBCarouselElement
                  style={{ height: "60vh" }}
                  src="https://edtimes.in/wp-content/uploads/2017/12/holiday2013_front.jpg"
                  alt="..."
                />
                <MDBCarouselCaption>
                  <h5></h5>
                  <p></p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
        </div>
      </div>

      <Latest></Latest>
      <Infra></Infra>
      <Party></Party>
    </div>
  );
}
