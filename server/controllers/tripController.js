const Trip = require("../models/Trip");

//Post Trip

const addTrip = async (req, res) => {
  try {
    const {
      carModel,
      seatingCapacity,
      price,
      dateTime,
      from,
      to,
      from_lat,
      from_lng,
      to_lat,
      to_lng,
      tripGender,
      luggage,
      music,
      smoking,
      airConditioned,
    } = req.body;

    const newTrip = new Trip({
      owner: req.userId,
      carModel,
      seatingCapacity,
      price,
      dateTime,
      from,
      to,
      from_lat,
      from_lng,
      to_lat,
      to_lng,
      tripGender,
      luggage,
      music,
      smoking,
      airConditioned,
    });
    //save db
    const savedTrip = await newTrip.save();
    //send to front
    res.json(savedTrip);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//Get ALL trip
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//Get ALL trip
const getMyTrip = async (req, res) => {
  try {
    const trips = await Trip.find({ owner: req.userId });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//Upadted Trip

const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//Delete Trip
const deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    res.json(deletedTrip);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

module.exports = { addTrip, getAllTrips, getMyTrip, updateTrip, deleteTrip };
