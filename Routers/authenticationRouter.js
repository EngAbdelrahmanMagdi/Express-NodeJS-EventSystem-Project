const express = require("express");
const { body, query, param } = require("express-validator");
const controller = require("../Controllers/AuthenticationController")


const router = express.Router();

const passwordValidation =
    body("password")
        .isLength({ min: 5, max: 30 }).withMessage(" Password should be between 5 and 30 characters")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, "i").withMessage(" Password should contain at least one uppercase, one lower case and one digit");




router.post("/login", [
    body("username")
        .isAlpha().withMessage(" Name should be string").isLength({ min: 2, max: 30 }).withMessage("Username should be between 2 and 30 characters"),
    passwordValidation
], controller.login);


router.post("/register", [
    body("_id").isMongoId().withMessage("Make sure you entered an Object ID"),
    body("fullname").isAlpha('en-US', { ignore: ' ' }).withMessage("  Name should be string in English").isLength({min: 2, max: 30 }).withMessage(" Name should be between 2 and 30 characters"),
    passwordValidation,
    body("email").isEmail().withMessage("  Invalid email try again"),
    body("Image").isAlpha().withMessage("  Image characters should be string").isLength({min:5, max: 200 }).withMessage("Maximum length of image is 200 characters"),
], controller.register);



module.exports = router;




