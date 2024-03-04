const express = require("express");
const router = express.Router();

const { getMapTitles } = require("../controllers/map.controller");

router.get("/get-maptitles", getMapTitles);
module.exports = router;
