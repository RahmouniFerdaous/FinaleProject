import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { getProfile } from "../redux/actions/authActions";

const ProfilePage = () => {
  //selector state
  const auth = useSelector((state) => state.auth);
  //dispatch action
  const dispatch = useDispatch();
  // component did mount
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Image
          src={auth.user.profilePic.url || "/images/avatar.jpg"}
          alt="profile picture"
          roundedCircle
        />
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
          <Card.Link href="#">Edit</Card.Link>
          <Card.Link href="#">Become a Driver?</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
