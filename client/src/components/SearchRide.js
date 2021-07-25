import React, { useState } from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
      {console.log(
        "from: " + from,
        "lat: " + fromCoordinate.lat,
        "lng: " + fromCoordinate.lng
      )}
      {console.log(
        "to: " + to,
        "lat: " + toCoordinate.lat,
        "lng: " + toCoordinate.lng
      )}
      <Typography
        component="h1"
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Search a CarPooling
      </Typography>
      <br />
      <MapboxAutocomplete
        publicKey="pk.eyJ1IjoiZG91c3MiLCJhIjoiY2tyZ3h1bGNuMDNteTJvcGVueThzNnZmMiJ9.LhxHYK7IQDlS6VZTSiPu3A"
        inputClass="form-control search"
        placeholder="From ..."
        onSuggestionSelect={suggestionSelectFrom}
        value={from}
        country="tn"
        resetSearch={false}
      />
      <br />
      <MapboxAutocomplete
        publicKey="pk.eyJ1IjoiZG91c3MiLCJhIjoiY2tyZ3h1bGNuMDNteTJvcGVueThzNnZmMiJ9.LhxHYK7IQDlS6VZTSiPu3A"
        inputClass="form-control search"
        placeholder="To ..."
        onSuggestionSelect={suggestionSelectTo}
        value={to}
        country="tn"
        resetSearch={false}
      />
      <br />
      <TextField
        id="date"
        label="Date of departure"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary">
        Search
      </Button>
      <Button variant="contained" color="secondary">
        Become a Rider?
      </Button>
    </div>
  );
};

export default SearchRide;
