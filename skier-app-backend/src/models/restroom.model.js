const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restroomSchema = new Schema({
  id: Number,
  name: String,
  loc: [Number],
});

module.exports = mongoose.model("Restroom", restroomSchema);
