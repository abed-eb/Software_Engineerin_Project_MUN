const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const edgeSchema = new Schema({
  start: String,
  end: String,
  weight: Number,
  color: String,
  name: String,
});

module.exports = mongoose.model("Edge", edgeSchema);
