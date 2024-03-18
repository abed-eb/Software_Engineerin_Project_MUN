const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const edgeSchema = new Schema({
  start: String,
  end: String,
  weight: Number,
});

module.exports = mongoose.model("Edge", edgeSchema);
