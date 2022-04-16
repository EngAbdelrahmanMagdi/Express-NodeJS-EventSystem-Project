const express = require("express");
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require("body-parser"); 


const authenticationRouter = require("./Routers/authenticationRouter"); 
const childRouter = require("./Routers/childRouter"); 
const teacherRouter = require("./Routers/teacherRouter"); 
const classRouter = require("./Routers/classRouter"); 
 

const app = express();

//start cors 
app.use(cors())


//port listening 
app.listen(process.env.PORT || 8080, () => {
    console.log(" Cors enabled now I'm listening ....")
});


//bodyParsing 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false})); 


//start morgan

app.use(morgan('tiny'));

morgan(':method :url :status :res[content-length] - :response-time ms');

morgan.token('host', function(req, res) {
    return req.hostname;
});

app.use(morgan(':method :host :status :param[id] :res[content-length] - :response-time ms'));

morgan.token('param', function(req, res, param) {
    return req.params[param];
});




//middlewares



app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*"); 
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
    next()
})



//=================Routers========END POINTS============ 

app.use("/",authenticationRouter); 
app.use("/child",childRouter); 
app.use("/teacher", teacherRouter);
app.use("/class", classRouter);




app.use((request, response, next) => {
    response.status(404).json({data:"Not Found"}); 
})



app.use(( error,request, response, next) => {
    let status = error.status||500; 
    response.status(status).json({Error:error+""});  
})