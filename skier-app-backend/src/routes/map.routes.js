const express = require("express");
const router = express.Router();

const {
  getMapTitles,
  getCoordinates,
} = require("../controllers/map.controller");

router.get("/get-maptitles", getMapTitles);
router.get("/locations", getCoordinates);

module.exports = router;
