const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedgeSchema = new Schema({
  start: String,
  end: String,
  weight: Number,
});

module.exports = mongoose.model("ProcessedEdge", pedgeSchema);
