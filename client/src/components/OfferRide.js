import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { addTrip } from "../redux/actions/tripActions";

const OfferRide = () => {
  const dispatch = useDispatch();
  const [newTrip, setNewTrip] = useState({
    from: "",
    to: "",
    from_lat: null,
    from_lng: null,
    to_lng: null,
    from_lat: null,
    CarModel: "",
    price: 0,
    dateTime: "",
    seatingCapacity: 0,
    tripGender: "",
    luggage: false,
    music: false,
    smoking: false,
    airConditioned: false,
  });
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
    setNewTrip({ ...newTrip, from: result, from_lat: lat, from_lng: lng });
  };
  const suggestionSelectTo = async (result, lat, lng, text) => {
    setTo(result);
    setToCoordinate({ lat: lat, lng: lng });
    setNewTrip({ ...newTrip, to: result, to_lat: lat, to_lng: lng });
  };

  //seating number
  const [seating, setSeating] = useState("");
  const [open, setOpen] = useState(false);

  const handleChangeSeating = (event) => {
    setSeating(event.target.value);
    setNewTrip({ ...newTrip, seatingCapacity: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // Gender Trip
  const [value, setValue] = useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
    setNewTrip({ ...newTrip, tripGender: event.target.value });
  };
  //luggage
  const [luggage, setLuggage] = useState({
    checkedA: true,
  });

  const handleChangeCheckLuggage = (event) => {
    setLuggage({ ...luggage, [event.target.name]: event.target.checked });
    setNewTrip({ ...newTrip, luggage: event.target.checked });
  };
  //music
  const [music, setMusic] = useState({
    checkedB: true,
  });

  const handleChangeCheckMusic = (event) => {
    setMusic({ ...music, [event.target.name]: event.target.checked });
    setNewTrip({ ...newTrip, music: event.target.checked });
  };
  //smoking
  const [smoking, setSmoking] = useState({
    checkedC: true,
  });

  const handleChangeCheckSmoking = (event) => {
    setSmoking({ ...smoking, [event.target.name]: event.target.checked });
    setNewTrip({ ...newTrip, smoking: event.target.checked });
  };
  //airConditioned
  const [airConditioned, setAirConditioned] = useState({
    checkedD: true,
  });

  const handleChangeCheckairConditioned = (event) => {
    setAirConditioned({
      ...airConditioned,
      [event.target.name]: event.target.checked,
    });
    setNewTrip({ ...newTrip, airConditioned: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTrip(newTrip));
  };

  //router dom
  const history = useHistory();

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
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Publish a CarPooling
        </Typography>
        <br />
        <Row>
          <Col xs={6}>
            <MapboxAutocomplete
              publicKey="pk.eyJ1IjoiZG91c3MiLCJhIjoiY2tyZ3h1bGNuMDNteTJvcGVueThzNnZmMiJ9.LhxHYK7IQDlS6VZTSiPu3A"
              inputClass="form-control search"
              placeholder="From ..."
              onSuggestionSelect={suggestionSelectFrom}
              value={from}
              country="tn"
              resetSearch={false}
              required
            />
            <MapboxAutocomplete
              publicKey="pk.eyJ1IjoiZG91c3MiLCJhIjoiY2tyZ3h1bGNuMDNteTJvcGVueThzNnZmMiJ9.LhxHYK7IQDlS6VZTSiPu3A"
              inputClass="form-control search"
              placeholder="To ..."
              onSuggestionSelect={suggestionSelectTo}
              value={to}
              country="tn"
              resetSearch={false}
            />

            <Form.Control
              name="carModel"
              type="text"
              placeholder="Car Model"
              onChange={(e) =>
                setNewTrip({ ...newTrip, carModel: e.target.value })
              }
            />
            <br />
            <Form.Control
              name="price"
              type="text"
              placeholder="Price by place (DT)"
              onChange={(e) =>
                setNewTrip({ ...newTrip, price: e.target.value })
              }
            />
            <br />
            <Row>
              <Col xs={6}>
                <TextField
                  id="datetime-local"
                  label=" Trip Date/Time"
                  type="datetime-local"
                  defaultValue="2021-01-01T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, dateTime: e.target.value })
                  }
                />
              </Col>
              <Col xs={6}>
                <InputLabel id="demo-controlled-open-select-label">
                  Seating capacity
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={seating}
                  onChange={handleChangeSeating}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <br />
            <FormLabel>Gender Trip</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="mixed"
                control={<Radio />}
                label="Mixed"
              />
            </RadioGroup>
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={luggage.checked}
                  onChange={handleChangeCheckLuggage}
                  name="checkedA"
                />
              }
              label="Luggage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={luggage.checked}
                  onChange={handleChangeCheckMusic}
                  name="checkedB"
                />
              }
              label="Music"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={smoking.checked}
                  onChange={handleChangeCheckSmoking}
                  name="checkedC"
                />
              }
              label="Smoking"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={airConditioned.checked}
                  onChange={handleChangeCheckairConditioned}
                  name="checkedD"
                />
              }
              label="Air Conditioned"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.goBack()}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "5px" }}
              onClick={handleSubmit}
            >
              Validate
            </Button>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default OfferRide;
// {console.log(
//   "from: " + from,
//   "lat: " + fromCoordinate.lat,
//   "lng: " + fromCoordinate.lng
// )}
// {console.log(
//   "to: " + to,
//   "lat: " + toCoordinate.lat,
//   "lng: " + toCoordinate.lng
// )}
// {console.log(newTrip)}
