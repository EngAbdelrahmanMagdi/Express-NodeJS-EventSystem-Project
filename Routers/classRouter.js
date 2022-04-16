const express = require("express");
const { body, query, param } = require("express-validator");
const controller = require("../Controllers/classController");
const router = express.Router();

const validateClassData = [
    body("_id").isInt().withMessage("ID should be integer"),
    body("name").isAlphanumeric('en-US', { ignore: ' ' }).withMessage(" Class Name should be alphanumerical in English").isLength({min: 2, max: 30 }).withMessage(" Class Name should be between 2 and 30 characters"),
    body("supervisor").isAlpha().withMessage("Class should have supervisor"),
    body("children").isArray().withMessage("Class should contain children in an array")
];

const validateID = param("id").isInt().withMessage("Invalid ID");


router.route("/")
    .get(controller.getAllClasses)
    .post(validateClassData, controller.addClass);

router.route("/:id")
    .get(validateID, controller.getClass)
    .put([validateID, validateClassData], controller.updateClass)
    .delete(validateID, controller.deleteClass)

router.route("/classChildren/:id")
    .get(validateID,controller.getClassChildren)

router.route("/classTeacher/:id")
    .get(validateID,controller.getClassTeacher);



module.exports = router;