var mongoose = require("mongoose");

var cSchema = new mongoose.Schema ({
        text: String,
        createDate: { type: Date, default: Date.now },
        author: {
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user"}, 
        username: String
        }
});

module.exports = mongoose.model("Comment", cSchema);