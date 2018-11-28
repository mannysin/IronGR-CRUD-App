const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  summary: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;