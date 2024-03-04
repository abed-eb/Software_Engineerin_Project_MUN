const Map = require("../models/map.model");

// Get all map titles
const getMapTitles = async (req, res) => {
  try {
    const mapTitles = await Map.find({});
    return res.json({ status: "ok", mapTitles });
  } catch (error) {
    return res.json({ status: "error", error: "No map titles created" });
  }
};

module.exports = { getMapTitles };
