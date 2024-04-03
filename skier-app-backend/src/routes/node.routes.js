const express = require("express");
const router = express.Router();

const {
  createEdge,
  createProcessedEdge,
} = require("../controllers/node.controller");
//All routes
router.get("/create-node", createEdge);
router.get("/create-pnode", createProcessedEdge);

module.exports = router;
