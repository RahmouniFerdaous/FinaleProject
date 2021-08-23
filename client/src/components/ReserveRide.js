import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSelectedTrip,
  updateSeatingCapacity,
} from "../redux/actions/tripActions";

import { Container, Row, Col, Button, Spinner } from "react-bootstrap";


import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapBoxToken = process.env.REACT_APP_MAPBOX_API_KEY;
const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

const ReserveRide = ({ match }) => {
  //center
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "400px",
    latitude: 36.8,
    longitude: 10.17,
    zoom: 4,
  });

  const [show, setShow] = useState(false);
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
    setShow(true);
    if (trips.tripList.seatingCapacity > 0) {
      dispatch(updateSeatingCapacity(id, info));
    } else {
      alert("Sorry! This trip has already reserved");
    }
  };
  //coordinates
  const [latF, setLatF] = useState(0);
  const [lngF, setLngF] = useState(0);
  const [latT, setLatT] = useState(0);
  const [lngT, setLngT] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lngF, latF],
        },
        properties: {
          name: from,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lngT, latT],
        },
        properties: {
          name: to,
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
  const handleCoordinates = (e) => {
    e.preventDefault();
    setLatF(trips.tripList.from_lat.$numberDecimal);
    setLngF(trips.tripList.from_lng.$numberDecimal);
    setLatT(trips.tripList.to_lat.$numberDecimal);
    setLngT(trips.tripList.to_lng.$numberDecimal);
    setFrom(trips.tripList.from);
    setTo(trips.tripList.to);
  };

  return (
    <div>
      <div className="sidebar">
        Country: Tunisia | Trip: From | {from}  | To: {to}
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
        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </ReactMapGL>
      <br />
      <Container>
        <Row>
          <Col>
            <Button variant="info" size="lg" onClick={() => history.goBack()}>
              Go Back
            </Button>
          </Col>
          <Col>
            <Button variant="success" size="lg" onClick={handleCoordinates}>
              Map Coordinates ?
            </Button>
          </Col>
          <Col></Col>
          <Col>
            {show && (
              <Button variant="danger" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
            )}{" "}
            <Button variant="danger" size="lg" onClick={handleSeatingCapacity}>
              Reserve Now!
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReserveRide;
