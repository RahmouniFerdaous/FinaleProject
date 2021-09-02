import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, InputGroup, Form, FormControl } from "react-bootstrap";
import Compressor from "compressorjs";

import { editProfile } from "../redux/actions/authActions";

function EditProfile() {
  //state for profilePic
  const [selectedImage, setSelectedImage] = useState("");
  //state for others
  const [info, setInfo] = useState({
    fisrtName: "",
    lastName: "",
    age: "",
    phone: "",
    ProfilePic: null,
  });
  //compressor
  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const myImage = e.target.files[0];
      new Compressor(myImage, {
        quality: 0.8,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            setSelectedImage(reader.result);
            setInfo({ ...info, profilePic: reader.result });
          };
        },
      });
    }
  };
  //router dom
  const history = useHistory();
  // selector state
  const auth = useSelector((state) => state.auth);
  const id = auth.user._id;
  // dispatch action
  const dispatch = useDispatch();
  // submit action
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(editProfile(id, info));
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
      <br />
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              First Name
            </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder={auth.user.firstName}
              required
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
              autoFocus
            />
            <InputGroup.Text id="inputGroup-sizing-default">
              Last Name
            </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder={auth.user.lastName}
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Age
            </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder={auth.user.age}
              onChange={(e) => setInfo({ ...info, age: e.target.value })}
            />
            <InputGroup.Text id="inputGroup-sizing-default">
              Phone
            </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder={auth.user.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            />
          </InputGroup>
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <img
              name="image"
              alt="profile pic"
              width="150"
              height="150"
              src={selectedImage || "/images/avatar.jpg"}
            />
            <br />
            <input
              type="file"
              name="profilePic"
              accept="images/*"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => history.goBack()}>
            Go Back
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
      <br />
    </div>
  );
}

export default EditProfile;
