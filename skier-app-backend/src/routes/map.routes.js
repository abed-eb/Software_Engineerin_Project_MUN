const express = require("express");
const router = express.Router();

const {
  getCoordinates,
  getShortestPath,
} = require("../controllers/map.controller");

router.get("/locations", getCoordinates);
router.post("/shortest-path", getShortestPath);

module.exports = router;
