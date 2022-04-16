const { validationResult } = require("express-validator");

function validateRequest(request) {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
        throw error;
    }
}

exports.getAllClasses = (request, response) => {
    validateRequest(request);
    response.status(200).json({ Data: [{name: "Class A"}, {name: "Class B"}] });
}

exports.getClass = (request, response) => {
    validateRequest(request);
    response.status(200).json({ Data: {name: "Class A"} });
}

exports.addClass = (request, response) => {
    validateRequest(request);
    response.status(200).json({ response: "Class created successfully", body: request.body });
}

exports.updateClass = (request, response) => {
    validateRequest(request);
    response.status(200).json({ response: "Class updated", body: request.body });
}

exports.deleteClass = (request, response) => {
    validateRequest(request);
    // response.status(200).json({Data:"delete Class", id:request.params})
    response.status(200).json({ response: "Class deleted" });
}

exports.getClassChildren = (request, response) => {
    validateRequest(request);
    response.status(200).json({ Data: {name: "Class C"} });
}

exports.getClassTeacher = (request, response) => {
    validateRequest(request);
    response.status(200).json({ Data: {name: "Class B"} });
}