var express = require("express");
var router = express.Router();
var passport = require("passport");
var user  = require("../modules/user");


router.get("/", function(req, res){
    res.render("landing");
});

// REGISTER
// --------------------

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to This Turn of the Rodio "+ user.username);
                res.redirect("/spaces");
            });
        }
    });
});

// LOGIN
// -------------------------

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/spaces",
    failureRedirect: "/login"
}), function(req, res){

});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged Out");
    res.redirect("/spaces");
});

module.exports = router;