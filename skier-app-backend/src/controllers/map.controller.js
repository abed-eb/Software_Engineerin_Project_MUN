const Map = require("../models/map.model");
const Restroom = require("../models/restroom.model");
const Station = require("../models/station.model");
const Restaurant = require("../models/restaurant.model");

// Get all map titles
const getMapTitles = async (req, res) => {
  try {
    const mapTitles = await Map.find({});
    return res.json({ status: "ok", mapTitles });
  } catch (error) {
    return res.json({ status: "error", error: "No map titles created" });
  }
};

// Get all coordinate
const getCoordinates = async (req, res) => {
  try {
    const stations = await Station.find({});
    const restrooms = await Restroom.find({});
    const restaurants = await Restaurant.find({});
    return res.json({ status: "ok", stations, restrooms, restaurants });
  } catch (error) {
    return res.json({ status: "error", error: "No map coordinates found" });
  }
};

module.exports = { getMapTitles, getCoordinates };
