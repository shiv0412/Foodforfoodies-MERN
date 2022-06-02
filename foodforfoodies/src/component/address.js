import react, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import mapicon from "../images/map-icon.png";

function Address() {
  const [viewport, setViewport] = useState({
    latitude: 28.5707841,
    longitude: 77.3271074,
    zoom: 13,
    width: "650px",
    height: "60vh",
  });
  return (
    <div>
      <div class="container">
        <div class="row">
          <div>
            <h1 className="reach_us_heading">Reach Us Now</h1>
            <p className="reach_us_tagline">
              A taste of home, your all occasions destination
            </p>
          </div>
          <div class="col-sm map_holder">
            {/* <h1>Div for map</h1> */}
            <ReactMapGL
              {...viewport}
              mapStyle="mapbox://styles/mapbox/streets-v10"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(viewport) => {
                setViewport(viewport);
              }}
            >
              <Marker
                latitude={28.5707841}
                longitude={77.3271074}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div>
                  <img src={mapicon} width="50" height="60"></img>
                </div>
              </Marker>
            </ReactMapGL>
          </div>
          <div
            class="col-sm"
            style={{ backgroundColor: "#D5D8DC", height: "60vh" }}
          >
            <div class="card 1" style={{ borderRadius: "20px" }}>
              <div
                class="card_image"
                style={{ backgroundColor: "orangered", borderRadius: "20px" }}
              >
                {/* <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> */}
                <h2 className="address_card_title">Our Address</h2>
                <p className="address_data">
                  Unit 19-20 RDC
                  <br />
                  Raj Nagar, Ghaziabad
                  <br />
                  Uttar Pradesh 201002
                  <br />
                  Hours: Open ⋅ Closes 10PM
                  <br />
                  Phone: 09000002222
                  <br />
                  Email:FoodForFoodies@gmail.co
                  <br />
                  website: FoodForFoodies.io.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Address;
