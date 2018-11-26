const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  review: {type: Schema.Types.ObjectId, ref: 'Review'},
  comment:  String,
}, {
  timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;