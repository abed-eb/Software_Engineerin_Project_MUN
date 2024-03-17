const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  id: Number,
  name: String,
  loc: [Number],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
