const express = require("express");
const router = express.Router();

const {
  getAllStations,
  createStation,
} = require("../controllers/station.controller");
const {
  getAllRestrooms,
  createRestroom,
} = require("../controllers/restroom.controller");

const {
  getAllRestaurants,
  createRestaurant,
} = require("../controllers/restaurant.controller");

//All routes
router.get("/stations", getAllStations);
router.get("/restrooms", getAllRestrooms);
router.get("/restaurants", getAllRestaurants);

router.post("/create-restroom", createRestroom);
router.post("/create-station", createStation);
router.post("/create-restaurant", createRestaurant);

module.exports = router;
