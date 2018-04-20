var mongoose = require("mongoose"),
    passLocalMon = require("passport-local-mongoose");
    
var userSchem = new mongoose.Schema({
    username: String,
    password: String
});

userSchem.plugin(passLocalMon);

module.exports = mongoose.model("user", userSchem);