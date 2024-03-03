const mongoose = require("mongoose");

const db = async () => {
  await mongoose.connect("mongodb://127.0.0.1/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("conntected db");
};

module.exports = db;
