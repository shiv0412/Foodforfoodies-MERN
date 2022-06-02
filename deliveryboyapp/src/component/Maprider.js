import React from "react";
import MapGL, { NavigationControl } from "react-map-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"; // Updating node module will keep css up to date.

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGlwZnJveSIsImEiOiJjandjam5ybjIwNmFuM3pxaDlkcTNxd2J5In0.3k6E49SPCwLOt58p15ImgQ";

var directions = new MapboxDirections({
  accessToken: MAPBOX_TOKEN,
  unit: "metric",
  profile: "mapbox/driving-traffic",
  congestion: true,
  alternatives: true,
});

export default class Maprider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 28.5707841,
        longitude: 77.3271074,
        zoom: 15,
      },
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    var map = this.mapRef.current;

    map.addControl(directions, "top-left");
  }

  _onViewportChange = (viewport) => this.setState({ viewport });

  render() {
    const viewport = this.state.viewport;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ref={(ref) => (this.mapRef.current = ref && ref.getMap())}
      >
        <div style={{ width: "30px", position: "absolute", right: "0" }}>
          <NavigationControl
            onViewportChange={(viewport) => this.setState({ viewport })}
          />
        </div>
      </MapGL>
    );
  }
}
