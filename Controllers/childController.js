const {validationResult} = require("express-validator");


function validateRequest(request) {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + "", "");
        throw error;

    }
}

exports.getAllChildren = (request, response) => {
    validateRequest(request)
    response.status(200).json([{ Data: [{name: "Abdo"}, {name: "Boudy"}] }])
};

exports.getChild = (request, response) => {
    validateRequest(request);
    response.status(200).json({ Data:{name: "Abdo"} });
}

exports.addChild = (request, response)=> {
    validateRequest(request)
    response.status(201).json({Data:"Child added", BODY:request.body})
};

exports.updateChild = (request, response) => {
    validateRequest(request)
    response.status(200).json({Data:"Child updated", BODY:request.body})
}; 

exports.deleteChild = (request, response)=> {
    validateRequest(request)
    // response.status(200).json({Data:"delete Child", id:request.params})
    response.status(200).json({Data:"Child deleted"})
};



    