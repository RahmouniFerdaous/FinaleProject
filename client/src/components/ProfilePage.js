import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import SpinnerPage from "./SpinnerPage";
import Typography from "@material-ui/core/Typography";

import { getProfile } from "../redux/actions/authActions";
import {
  getMyTrip,
  getTripCount,
  deleteTrip,
} from "../redux/actions/tripActions";

import LimitSelector from "./LimitSelector";

const ProfilePage = () => {
  //selector state
  const auth = useSelector((state) => state.auth);
  const trips = useSelector((state) => state.trips);
  const count = useSelector((state) => state.trips.count);
  const isLoading = useSelector((state) => state.trips.isLoading);
  //Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  //dispatch action
  const dispatch = useDispatch();
  // component did mount
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getTripCount());
    dispatch(getMyTrip(page, limit));
  }, []);
  //delete
  const onDelete = (id) => {
    dispatch(deleteTrip(id));
    dispatch(getMyTrip(1,3));
  };
  return (
    <div
      style={{
        background: "#C6FFDD",
        background:
          "-webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)",
        background: "linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)",
      }}
    >
      <Container>
        <Row>
          <Col sm={2}>
            <br />
            <Card style={{ width: "18rem" }}>
              {!auth.user ? (
                <Image
                  src="/images/avatar.jpg"
                  alt="profile picture"
                  width="100%"
                  height="280"
                />
              ) : (
                <Image
                  src={auth.user.profilePic.url}
                  alt="profile picture"
                  width="100%"
                  height="280"
                />
              )}
              <Card.Body>
                <Card.Title>
                  {auth.user.firstName} {auth.user.lastName}
                </Card.Title>
                <Card.Text>🔗 {auth.user.role}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>✉ {auth.user.email}</ListGroupItem>
                <ListGroupItem> {auth.user.age} years old</ListGroupItem>
                <ListGroupItem>☏ {auth.user.phone}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="/editProfile">Edit</Card.Link>
                {auth.isAuth && auth.user && auth.user.role !== "driver" && (
                  <Card.Link href="/searchRide">Become a Driver?</Card.Link>
                )}
              </Card.Body>
            </Card>
            <br />
          </Col>
          <Col sm={10}>
            <Typography>Your CarPooling Suggestions List ...</Typography>
            {" "}
        {isLoading && <SpinnerPage />}{" "}
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {trips.tripList.length &&
                trips.tripList.map((trip, index) => (
                  <Card 
                    key={index}
                    style={{
                      marginLeft: "10px",
                      flex: "0 0 215px",
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
                          <Card.Title>
                            <i class="bi bi-circle"></i> {trip.from}
                          </Card.Title>
                          <Card.Title>
                            <i class="bi bi-circle-fill"></i> {trip.to}
                          </Card.Title>
                          <Card.Title>
                            <i class="bi bi-truck"></i> {trip.carModel}
                          </Card.Title>
                          <Card.Title>
                            {trip.price.$numberDecimal} DT
                          </Card.Title>
                        </Col>
                      </Row>
                      <Row>
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
                    </Card.Body>
                    <Card.Footer>
                      <Row>
                        <Col>
                          <Button
                            href={`/updateRide/${trip._id}`}
                            variant="warning"
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="danger"
                            onClick={() => onDelete(trip._id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Seating Available <b>{trip.seatingCapacity}</b>
                      </small>
                    </Card.Footer>
                  </Card>
                ))}
            </Container>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col>
                <LimitSelector setLimit={setLimit} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
