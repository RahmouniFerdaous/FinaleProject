import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Avatar } from "@material-ui/core";

const TripAllDetails = ({ trips }) => {
  return (
    <>
    { trips.tripList.map((trip, index) => (
        <Card
        key={index}
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
                <Avatar alt="Remy Sharp" src={trip.owner.profilePic.url} />
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
        </Card.Body>
        <Card.Footer>
          <Card.Text className="text-muted">
            Seating Available <b>{trip.seatingCapacity}</b>
          </Card.Text>
        </Card.Footer>
      </Card>
      ))}
     </>
  );
};

export default TripAllDetails;