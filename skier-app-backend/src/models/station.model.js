const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  id: Number,
  name: String,
  loc: [Number],
});

module.exports = mongoose.model("Station", stationSchema);
