const { body } = require("express-validator");

exports.validationCheck = [
  body("email", "Please enter a valid email").isEmail(),
  body("password", "password should be at least 6 caracters").isLength({
    min: 6,
    max: 12,
  }),
];

// body("firstName", "First Name must have more than 2 characters").not().isEmpty(),
// body("lastName" , "Last Name must have more than 2 characters").not().isEmpty(),
// body("profilePic" , "Choose a profile picture please ").optional(),
// body("age" , "Please enter your age").not().isEmpty(),
// body("phone" , "Please enter your phone").not().isEmpty(),


