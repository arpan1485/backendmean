var express=require('express');
var mongoose=require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt')
const errorHandler = require('./_helpers/error-handler');
var app= express();

app.listen(3000);
console.log("Server Connected");

mongoose.connect("mongodb://localhost:27017/expenselist", { useNewUrlParser: true ,useUnifiedTopology: true } );
mongoose.connection.on('connected',()=>{ 
    console.log( "Mongoose connected  on 27017");
});


var projectsapiRouter=require('./routes/route');

app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
//Enabling CORS
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
next();
})
// use JWT auth to secure the api
app.use(jwt());

app.use('/api', projectsapiRouter);
// global error handler
app.use(errorHandler);

