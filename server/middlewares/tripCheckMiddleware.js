const { body } = require("express-validator");

exports.validationCheck = [
 
body("carModel" , "Please enter your car model").not().isEmpty(),
body("from" , "Please enter your depart point").not().isEmpty(),
body("to" , "Please enter your arrival point").not().isEmpty(),
body("dateTime" , "Please enter date of trip").not().isEmpty(),
body("price" , "Please enter price per person").not().isEmpty(),
body("seatingCapacity" , "Please enter seating capacity").not().isEmpty(),

];