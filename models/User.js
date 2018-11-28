const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  avatar: String,
  bio: String,
  confirmed: {type: Boolean, default: false},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  myGames: [{type: Schema.Types.ObjectId, ref: 'Game'}], 
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;