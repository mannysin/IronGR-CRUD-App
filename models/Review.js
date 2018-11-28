const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  game: String,
  rating: Number,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
}, {
  timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;