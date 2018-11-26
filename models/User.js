const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  avatar: String,
  bio: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment', default: []}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review', default: ['Make a review!']}],
  myGames: [String], 
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;