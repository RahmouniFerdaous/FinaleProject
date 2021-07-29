import React, { useState } from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Row, Col } from "react-bootstrap";

// const publicKey=process.env.REACT_APP_MAPBOX_API_KEY;

const SearchRide = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCoordinate, setFromCoordinate] = useState({
    lat: null,
    lng: null,
  });
  const [toCoordinate, setToCoordinate] = useState({
    lat: null,
    lng: null,
  });

  const suggestionSelectFrom = async (result, lat, lng, text) => {
    setFrom(result);
    setFromCoordinate({ lat: lat, lng: lng });
  };
  const suggestionSelectTo = async (result, lat, lng, text) => {
    setTo(result);
    setToCoordinate({ lat: lat, lng: lng });
  };

  return (
    <div>
      <Container
        style={{
          background: "#EECDA3",
          background: "-webkit-linear-gradient(to right, #EF629F, #EECDA3)",
          background: "linear-gradient(to right, #EF629F, #EECDA3)",
          marginTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <br />
        <Row>
          <Col>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Search a CarPooling
            </Typography>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="contained" color="secondary">
              Become a Rider?
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <i class="bi bi-circle"> Depart Point</i>
            <MapboxAutocomplete
              publicKey="pk.eyJ1IjoiZG91c3MiLCJhIjoiY2tyZ3h1bGNuMDNteTJvcGVueThzNnZmMiJ9.LhxHYK7IQDlS6VZTSiPu3A"
              inputClass="form-control search"
              placeholder="From ..."
              onSuggestionSelect={suggestionSelectFrom}
              value={from}
              country="tn"
              resetSearch={false}
            />
          </Col>
          <Col>
            <i class="bi bi-circle-fill"> Arrival Point</i>
            <MapboxAutocomplete
              publicKey="pk.eyJ1IjoiZG91c3MiLCJhIjoiY2tyZ3h1bGNuMDNteTJvcGVueThzNnZmMiJ9.LhxHYK7IQDlS6VZTSiPu3A"
              inputClass="form-control search"
              placeholder="To ..."
              onSuggestionSelect={suggestionSelectTo}
              value={to}
              country="tn"
              resetSearch={false}
            />
          </Col>
          <Col>
            <i class="bi bi-calendar-week"> Date of departure</i>
            <br />
            <TextField
              id="date"
              type="date"
              defaultValue="2021-01-01"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="contained" color="primary">
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="reset"
              style={{ marginLeft: "5px" }}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <hr />
      </Container>
    </div>
  );
};

export default SearchRide;
