const express = require("express");
const router = express.Router();

const { getAllNodes, createEdge } = require("../controllers/node.controller");
//All routes
router.get("/nodes", getAllNodes);
router.get("/create-node", createEdge);

module.exports = router;
