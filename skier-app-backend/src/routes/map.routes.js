const express = require("express");
const router = express.Router();

const {
  getCoordinates,
  getShortestPath,
  getAllPaths,
} = require("../controllers/map.controller");

router.get("/locations", getCoordinates);
router.post("/shortest-path", getShortestPath);
router.post("/all-paths", getAllPaths);

module.exports = router;
