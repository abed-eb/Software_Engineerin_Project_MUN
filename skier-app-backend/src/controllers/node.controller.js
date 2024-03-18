const Node = require("../models/node.model");

// Get all Nodes
const getAllNodes = async (req, res) => {
  try {
    const node = await Node.find({}).select("-__v");
    return res.json({ status: "ok", node });
  } catch (error) {
    return res.json({ status: "error", error: "No nodes found" });
  }
};

module.exports = { getAllNodes };
