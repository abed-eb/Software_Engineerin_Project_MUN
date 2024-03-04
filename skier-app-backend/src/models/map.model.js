const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Map", mapSchema);
