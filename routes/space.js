var space = require("../modules/spaceSchema");
var express = require("express");
var router = express.Router();
var override = require("method-override");
var middle = require("../middleware");

router.use(override("_method"));

router.get("/", function(req, res){
    space.find({}, function(err, allSpaces){
        if(err){
            console.log(err);
        }else {
            res.render("index", {spaces: allSpaces});
        }
    });
});

router.get("/new", middle.isLoggedIn, function(req, res){
    res.render("form");
});

router.post("/", middle.isLoggedIn, function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    space.create({name: req.body.newSpace, img: req.body.newPic, description: req.body.desc, author: author});
    res.redirect("/spaces");
});

router.get("/:id", function(req, res){
    var id = req.params.id;
    
    space.findById(id).populate("comments").exec(function(err, found){
        if(err){
            console.log(err);
        }else {
            res.render("show", {space: found});
        }
    });
});

router.get("/:id/edit", middle.isAuthor, function(req, res) {
    space.findById(req.params.id, function(err, space){
        if(err){
            console.log(err);
        }else{
            res.render("edit", {space: space});
        }
    }); 
});

router.put("/:id", middle.isAuthor, function(req, res){
    space.findByIdAndUpdate(req.params.id, req.body.space, function(err, updated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/spaces/" + req.params.id);
        }
    });
});

router.delete("/:id", middle.isAuthor, function(req, res){
    space.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Space Deleted");
            res.redirect("/spaces");
        }
    });
});

module.exports = router;