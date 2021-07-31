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
        let limit = +req.query.limit //nbre of trip per page
        let pageNumber = +req.query.page // nombre of page 
        let documentCount = await Trip.find().countDocuments()
        let numberTotalOfpages = Math.ceil(documentCount / limit); //5.5 => 6 page

        if (pageNumber > numberTotalOfpages)
        pageNumber = numberTotalOfpages

    const trips = await Trip.find()
                  .select({ '__v': 0 }) //without version
                  .sort({ 'dateTime': -1 }) //newset trips
                  .populate( {path:"owner",select:"created_at role _id firstName lastName profilePic age phone"} )
                  .skip((pageNumber - 1) * limit)
                  .limit(limit);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//Get ALL trip
const getMyTrip = async (req, res) => {
  try {
    const trips = await Trip.find({ owner: req.userId }).populate("owner");
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

//Trip Count
const getTripsCount = async (req, res) => {
    try {
      const count = await Trip.find().countDocuments();
      
      res.json({ count })
  }
  catch (err) {
      res.status(400).json({ errors: [{ msg: err.message }] })

  }
}

module.exports = { addTrip, getAllTrips, getTripsCount, getMyTrip, updateTrip, deleteTrip };
