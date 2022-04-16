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

exports.getAllTeachers = (request, response) => {
    validateRequest(request)
    response.status(200).json([{ Data: "list of Teachers:" ,BODY: [{name: "Abdelrahman"}, {name: "Magdy"}] }])
};

exports.getTeacher = (request, response) => {
    validateRequest(request);
    response.status(200).json({ data: "Teacher: ", BODY:{name: "Abdelrahman"} });
}

exports.addTeacher = (request, response)=> {
    validateRequest(request)
    response.status(201).json({Data:"Teacher added", BODY:request.body})
};

exports.updateTeacher = (request, response) => {
    validateRequest(request)
    response.status(200).json({Data:"Teacher updated", BODY:request.body})
}; 

exports.deleteTeacher = (request, response)=> {
    validateRequest(request)
    // response.status(200).json({Data:"delete Teacher", id:request.params})
    response.status(200).json({Data:"Teacher deleted"})
};



    