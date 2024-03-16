const Restroom = require("../models/restroom.model");

// Get all Restrooms
const getAllRestrooms = async (req, res) => {
  try {
    const restroom = await Restroom.find({});
    return res.json({ status: "ok", restroom });
  } catch (error) {
    return res.json({ status: "error", error: "No restrooms found" });
  }
};

// Create a new restroom
const createRestroom = async (req, res) => {
  const { name, loc } = req.body;

  if (!name || !loc)
    return res.json({
      status: "error",
      error: "Please provide both name and location",
    });

  try {
    const newRestroom = Restroom.create({
      name: req.body.name,
      loc: req.body.loc,
    });
    return res.json({ status: "ok", error: "Added restroom successfully" });
  } catch (error) {
    return res.json({
      status: "error",
      error: "Unable to save a new restroom",
    });
  }
};

module.exports = { getAllRestrooms, createRestroom };
