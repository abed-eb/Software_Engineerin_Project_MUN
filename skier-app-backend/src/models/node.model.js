const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nodeSchema = new Schema({
  x: Number,
  y: Number,
  text: String,
});

module.exports = mongoose.model("Node", nodeSchema);
