var express = require("express");
var router = express.Router({mergeParams: true});
var Comment   = require("../modules/comment");
var space = require("../modules/spaceSchema");
var override = require("method-override");
var middle = require("../middleware");

router.use(override("_method"));


router.get("/new", middle.isLoggedIn, function(req, res){
    var id = req.params.id;
    
    space.findById(id, function(err, space){
        if(err){
            req.flash("error", "Something Went Wrong");
            res.redirect("/spaces");
        }else{
            res.render("comments", {space: space});
        }
    });
});

router.post("/", middle.isLoggedIn, function(req, res){
    var id = req.params.id;
    space.findById(id, function(err, space) {
        if(err){
            req.flash("error", "Something Went Wrong");
            res.redirect("/spaces");
        }else{
            var comment = req.body.comment;
                Comment.create(comment, function(err, comment){
                    if(err){
                    }else{
                        
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        space.comments.push(comment);
                        space.save();
                        req.flash("success", "Comment Added");
                        res.redirect("/spaces/"+id);
                    }
            });
        }
    });
});

router.get("/:commId/edit", middle.isAuthorComm, function(req, res){
    Comment.findById(req.params.commId, function(err, comm) {
        if(err){
            req.flash("error", "Something Went Wrong");
            res.redirect("/spaces/"+req.params.id);
        }else{
            res.render("editComment", {comm: comm, spaceId: req.params.id});
        }
    });
});

router.put("/:commId", middle.isAuthorComm, function(req, res){
    Comment.findByIdAndUpdate(req.params.commId, req.body.comment, function(err, uComm){
        if(err){
            
        }else{
            res.redirect("/spaces/"+req.params.id);
        }
    });
});

router.delete("/:commId", middle.isAuthorComm, function(req, res){
    Comment.findByIdAndRemove(req.params.commId, function(err){
        if(err){
            
        }else{
            req.flash("success", "Comment Deleted");
            res.redirect("/spaces/"+req.params.id);
        }
    });
});

module.exports = router;