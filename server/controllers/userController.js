const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");
const cloudinary = require("../helpers/cloudinary");

// register
const register = async (req, res) => {
  try {
    //validationCheckMiddeleware
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.mapped() });
    //create user
    const { firstName, lastName, email, password, profilePic, age, phone } =
      req.body;
    console.log(profilePic);
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ errors: [{ msg: "User exist !" }] });
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      age,
      phone,
    });
    //password crypt
    // await : switch to synchrone block
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    //profile pic saved on cloudinary
    if (profilePic) {
      const savedImage = await cloudinary.uploader.upload(profilePic, {
        timeout: 60000,
        upload_preset: "car-pool-app",
      });
      console.log(savedImage);
      newUser.profilePic = {
        url: savedImage.url,
        public_id: savedImage.public_id,
      };
    }
    //save user
    // save() asynchrone -> await : switch to synchrone block
    const registredUser = await newUser.save();
    // send registredUser by JWT
    const payload = {
      sub: registredUser._id,
    };
    const token = await jwt.sign(payload, config.get("JWT_CONFIG.SECRET"));
    res.json({ token });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//login
const login = async (req, res) => {
  try {
    //validationCheckMiddeleware
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.mapped() });
    const { email, password } = req.body;
    //verify email
    const user = await User.findOne({ email });
    //user not found
    if (!user)
      return res
        .status(404)
        .json({ errors: [{ msg: "Please register before !" }] });
    //user found so dcrypt password
    const isMatch = await bcrypt.compare(password, user.password);
    // password req.body <> password user.password
    if (!isMatch)
      return res.status(404).json({ errors: [{ msg: "Wrong Password !" }] });
    // password verified : generate token
    const payload = {
      sub: user._id,
    };
    const token = await jwt.sign(payload, config.get("JWT_CONFIG.SECRET"));
    res.json({ token });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select({ password: 0, _v: 0 }); //user password not select('-password)
    res.json(user);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

//Upadted role

const updateRole = async (req, res) => {
  try {
    const updatedRole = await User.findByIdAndUpdate(req.params.id, {...req.body}, {new:true});
    res.json(updatedRole);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

module.exports = { register, login, getUserProfile, updateRole };
