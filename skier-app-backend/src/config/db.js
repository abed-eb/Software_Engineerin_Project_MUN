const mongoose = require("mongoose");

const db = async () => {
  await mongoose.connect(
    "mongodb+srv://faham:faham114@cluster0.dwhvgtc.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("conntected db");
};

module.exports = db;
