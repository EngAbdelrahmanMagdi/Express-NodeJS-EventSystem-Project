const { validationResult } = require("express-validator");


function validateAuthentication(request) {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + "", "");
        throw error;

    }
}

exports.login = (request, response) => {
    validateAuthentication(request);
    response.status(201).json({ Data: "logged is successfully", BODY: request.body })
};

exports.register = (request, response) => {
    validateAuthentication(request);
    response.status(201).json({ Data: "registered successfully", BODY: request.body })
};



