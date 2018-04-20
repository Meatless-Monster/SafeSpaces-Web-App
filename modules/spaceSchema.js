var mongoose = require("mongoose");

var sSchema = new mongoose.Schema ({
    name: String,
    img: String,
    description: String,
    createDate: { type: Date, default: Date.now },
    author: { 
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }, 
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("camp", sSchema);