const express = require("express");
const { body, query, param } = require("express-validator");
const controller = require("../Controllers/teacherController");

const router = express.Router();

let validateTeacherData =  [
    body("_id").isMongoId().withMessage("Make sure you entered an Object ID"),
    body("fullname").isAlpha('en-US', { ignore: ' ' }).withMessage("  Name should be string in English").isLength({min: 2, max: 30 }).withMessage(" Name should be between 2 and 30 characters"),
    body("password")
    .isLength({ min: 5, max: 30 }).withMessage(" Password should be between 5 and 30 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, "i").withMessage(" Password should contain at least one uppercase, one lower case and one digit"),
    body("email").isEmail().withMessage("  Invalid email try again"),
    body("Image").isAlpha().withMessage("  Image characters should be string").isLength({min:5, max: 200 }).withMessage("Maximum length of image is 200 characters"),
];

let validateID = param("id").isInt().withMessage("Invalid ID");

router.route("/")
    .get(controller.getAllTeachers)
    .post(validateTeacherData, controller.addTeacher);

router.route("/:id")
    .get(validateID, controller.getTeacher)
    .put([validateID, validateTeacherData], controller.updateTeacher)
    .delete(validateID, controller.deleteTeacher);

module.exports = router;