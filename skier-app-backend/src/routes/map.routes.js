const express = require("express");
const router = express.Router();

const { getCoordinates } = require("../controllers/map.controller");

router.get("/locations", getCoordinates);

module.exports = router;
