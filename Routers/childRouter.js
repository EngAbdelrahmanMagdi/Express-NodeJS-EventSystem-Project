const express = require("express");
const { body, query, param } = require("express-validator");
const controller = require("./../Controllers/childController")

const router = express.Router();


const validateChildData = [
    body("_id").isInt().withMessage("ID should be integer"),
    body("fullname").isAlpha('en-US', { ignore: ' ' }).withMessage("  Name should be string in English").isLength({min: 2, max: 30 }).withMessage(" Name should be between 2 and 30 characters"),
    body("age").isInt({min: 3, max: 12}).withMessage("Child's age should be numerical value between 3 and 12 years old"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Leven should be between (PreKG, KG1, KG2"),
    body("address.city").isAlpha().withMessage("City should be string"),
    body("address.street").isAlpha().withMessage("Street should be string"),
    body("address.building").isAlphanumeric().withMessage("Address should be between characters and numbers"),
];

const validateID = param("id").isInt().withMessage("Invalid ID");


router.route("/")
    .get(controller.getAllChildren)
    .post(validateChildData, controller.addChild);

router.route("/:id")
    .get(validateID, controller.getChild)
    .put([validateID, validateChildData], controller.updateChild)
    .delete(validateID, controller.deleteChild);

module.exports = router; 