var space = require("../modules/spaceSchema");
var Comment   = require("../modules/comment");

var middle = {};

middle.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Log In");
    res.redirect("/login");
};

middle.isAuthorComm = function(req, res, next){

    if(req.isAuthenticated()){
        Comment.findById(req.params.commId, function(err, comm) {
            if(err){
                req.flash("error", "Comment Not Found");
                res.redirect("back");
            }else{
                if(comm.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "Please Log In");
        res.redirect("back");
    }
};

middle.isAuthor = function(req, res, next){

    if(req.isAuthenticated()){
        space.findById(req.params.id, function(err, space) {
            if(err){
                req.flash("error", "Space Not Found");
                res.redirect("/spaces");
            }else{
                if(space.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "Please Log In");
        res.redirect("back");
    }
};

module.exports = middle;