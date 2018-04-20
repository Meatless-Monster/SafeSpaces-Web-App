var express = require("express");
var app = express();
var parse = require("body-parser");
var mongoose = require("mongoose");
var space = require("./modules/spaceSchema");
var Comment   = require("./modules/comment");
var user  = require("./modules/user");
var flash = require("connect-flash");

var commRoutes = require("./routes/comments"),
    spaceRoutes = require("./routes/space"),
    authRoutes = require("./routes/auth")



var passport = require("passport"),
    passLocal = require("passport-local"),
    passLocalMon = require("passport-local-mongoose")
    
    
// var seeds = require("./seeds");

// seeds();
mongoose.connect("mongodb://localhost/yelp");

app.locals.moment = require("moment");

app.use(flash());
app.set("view engine", "ejs");
app.use(parse.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

app.use(require("express-session")({
    secret: "this phrase will be used to encode and decode the sessions",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/spaces/:id/comments", commRoutes);
app.use("/spaces", spaceRoutes);
app.use("/", authRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App Running");
});
