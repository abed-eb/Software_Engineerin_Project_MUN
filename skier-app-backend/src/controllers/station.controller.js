const Station = require("../models/station.model");

// Get all Stations
const getAllStations = async (req, res) => {
  try {
    const station = await Station.find({});
    return res.json({ status: "ok", station });
  } catch (error) {
    return res.json({ status: "error", error: "No stations found" });
  }
};

// Create a new station
const createStation = async (req, res) => {
  const { name, loc } = req.body;

  if (!name || !loc)
    return res.json({
      status: "error",
      error: "Please provide both name and location",
    });

  try {
    const newStation = Station.create({
      name: req.body.name,
      loc: req.body.loc,
    });
    return res.json({ status: "ok", error: "Added station successfully" });
  } catch (error) {
    return res.json({
      status: "error",
      error: "Unable to save a new station",
    });
  }
};

module.exports = { getAllStations, createStation };
