import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSelectedTrip,
  updateSeatingCapacity,
} from "../redux/actions/tripActions";

import { Container, Row, Col, Button } from "react-bootstrap";

import ReactMapGL, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapBoxToken = process.env.REACT_APP_MAPBOX_API_KEY;

const ReserveRide = ({ match }) => {

  //center
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "400px",
    latitude: 36.8,
    longitude: 10.17,
    zoom: 4,
  });
  //redux
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips);
  //router dom
  const history = useHistory();
  //componentDidMount
  const id = match.params.id;
  useEffect(() => {
    dispatch(getSelectedTrip(id));
  }, []);

  //seating capacity
  const info = { seatingCapacity: trips.tripList.seatingCapacity - 1 };

  const handleSeatingCapacity = (e) => {
    e.preventDefault();
    if (trips.tripList.seatingCapacity > 0) {
      dispatch(updateSeatingCapacity(id, info));
    } else {
      alert("Sorry! This trip has already reserved");
    }
  };
  //coordinates
  // const latF = trips.tripList.from_lat.$numberDecimal
  // const lngF = trips.tripList.from_lng.$numberDecimal
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [10.11667, 33.88333],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [8.13333, 33.91667],
        },
      },
    ],
  };
  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };
  return (
    <div>
      <div className="sidebar">
        Country: Tunisia | Longitude: {viewport.longitude} | Latitude:{" "}
        {viewport.latitude} | Zoom: {viewport.zoom}
      </div>
      <ReactMapGL
        mapStyle="mapbox://styles/douss/cksb48yml01t417uq1fx3qml0"
        mapboxApiAccessToken={mapBoxToken}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
      <br />
      <Container>
        <Row>
          <Col>
            <Button variant="info" onClick={() => history.goBack()}>
              Go Back
            </Button>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="success" size="lg" onClick={handleSeatingCapacity}>
              Reserve Now!
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReserveRide;
