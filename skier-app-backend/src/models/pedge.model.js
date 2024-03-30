const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedgeSchema = new Schema({
  start: String,
  end: String,
  weight: Number,
  name: String,
  color: String,
});

module.exports = mongoose.model("ProcessedEdge", pedgeSchema);
