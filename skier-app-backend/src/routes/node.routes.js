const express = require("express");
const router = express.Router();

const {
  getAllNodes,
  createEdge,
  createProcessedEdge,
} = require("../controllers/node.controller");
//All routes
router.get("/nodes", getAllNodes);
router.get("/create-node", createEdge);
router.get("/create-pnode", createProcessedEdge);

module.exports = router;
