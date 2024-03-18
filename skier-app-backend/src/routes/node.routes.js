const express = require("express");
const router = express.Router();

const { getAllNodes, createNode } = require("../controllers/node.controller");
//All routes
router.get("/nodes", getAllNodes);

module.exports = router;
