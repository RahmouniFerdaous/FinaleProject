import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Avatar } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Container, Row, Col, Card } from "react-bootstrap";

import { getAllTrips, getTripCount } from "../redux/actions/tripActions";

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
  // //role
  // const [role,setRole]= useState("")

  //dispatch action
  const dispatch = useDispatch();
  //selector state
  const trips = useSelector((state) => state.trips);
  const count = useSelector((state) => state.trips.count);
  //
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  // component did mount
  useEffect(() => {
    dispatch(getTripCount());
    dispatch(getAllTrips(page, limit));
  }, []);
  //pagination
  const handlePageChange = (e, p) => {
    setPage(p);
    dispatch(getAllTrips(p, limit));
  };

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
            <Link href="/offerRide">
              <Button variant="contained" color="secondary">
                Become a Rider?
              </Button>
            </Link>
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

      <Container
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {trips.tripList.length &&
          trips.tripList.map((trip, index) => (
            <Card
              style={{
                marginLeft: "10px",
                flex: "0 0 500px",
                margin: "1em 10px",
                border: "2px solid",
              }}
              border="danger"
            >
              <Card.Header>
                Carpooling at <b>{trip.dateTime}</b>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    {!trip.owner.profilePic ? (
                      <Avatar alt="Remy Sharp" src="/images/avatar.jpg" />
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        src={trip.owner.profilePic.url}
                      />
                    )}
                    <span>
                      <i class="bi bi-person"></i>
                      {trip.owner.firstName} {trip.owner.lastName}
                    </span>
                    <br />
                    <span>{trip.owner.age} years old</span>
                    <br />
                    <span>
                      <i class="bi bi-telephone"></i> {trip.owner.phone}
                    </span>
                    <br />
                    <span>
                      <i class="bi bi-truck"></i> {trip.carModel}
                    </span>
                  </Col>
                  <Col>
                    <Card.Title>
                      <i class="bi bi-circle"></i> {trip.from}
                    </Card.Title>
                    <Card.Title>
                      <i class="bi bi-circle-fill"></i> {trip.to}
                    </Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                    <Card.Title>{trip.price.$numberDecimal} DT</Card.Title>
                  </Col>
                  <Col>
                    {trip.tripGender === "male" && (
                      <i class="bi bi-gender-male">
                        {" "}
                        Male
                        <br />
                      </i>
                    )}{" "}
                    {trip.tripGender === "female" && (
                      <i class="bi bi-gender-female">
                        {" "}
                        Female
                        <br />
                      </i>
                    )}{" "}
                    {trip.tripGender === "mixed" && (
                      <i class="bi bi-gender-ambiguous">
                        {" "}
                        Mixed
                        <br />
                      </i>
                    )}{" "}
                    {trip.luggage && (
                      <i class="bi bi-bag-plus">
                        {" "}
                        Luggage
                        <br />
                      </i>
                    )}
                    {trip.music && (
                      <i class="bi bi-music-note-beamed">
                        {" "}
                        Music
                        <br />
                      </i>
                    )}{" "}
                    {trip.airConditioned && (
                      <i class="bi bi-snow2">
                        {" "}
                        AirC
                        <br />
                      </i>
                    )}{" "}
                    {trip.smoking && (
                      <i class="bi bi-wind">
                        {" "}
                        Smoking
                        <br />
                      </i>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      Seating Available {trip.seatingCapacity}
                    </Card.Text>
                  </Col>
                  <Col></Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
      </Container>
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Pagination
              color="secondary"
              count={Math.ceil(count / limit)}
              onChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchRide;
