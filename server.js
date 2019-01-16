var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(session);

var app = express();

// Membuat Connection Database
mongoose.connect("mongodb://root:Samsung33@ds157544.mlab.com:57544/mongoose", {useNewUrlParser: true}, function(err){
    if (err){
        console.log(err);
    } else {
        console.log("Connection Database OK")
    }
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true, // to force session save to session store after modified or not selama request.
    saveUninitialized: true, // to save to store unitialize session.
    secret: "Hello", // secret to sign session ID cookie.
    store: new MongoStore({ url: "mongodb://root:Samsung33@ds157544.mlab.com:57544/mongoose", autoReconnect: true })
}));

// Setup Server
app.listen(3000, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Server run port 3000")
    }
});