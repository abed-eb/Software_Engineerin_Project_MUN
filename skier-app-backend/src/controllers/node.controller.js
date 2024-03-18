const Node = require("../models/node.model");
const Edge = require("../models/edge.model");

// Get all Nodes
const getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find({}, "-_id -__v");
    const edges = await Edge.find({}, "-_id -__v");
    return res.json({ status: "ok", nodes, edges });
  } catch (error) {
    return res.json({ status: "error", error: "No nodes found" });
  }
};

const createEdge = () => {
  const NodesData = [
    { x: 200, y: 200, text: "A" },
    { x: 300, y: 300, text: "B" },
    { x: 500, y: 430, text: "C" },
    { x: 250, y: 612, text: "D" },
    { x: 430, y: 618, text: "E" },
    { x: 534, y: 542, text: "F" },
  ];

  Node.insertMany(NodesData)
    .then((nodes) => console.log("Stations data saved successfully"))
    .catch((err) => console.error("Error saving stations data:", err));

  // Define and save edges data
  const edgesData = [
    { start: "A", end: "B", weight: 10 }, // A to B
    { start: "A", end: "D", weight: 5 }, // A to D
    { start: "B", end: "C", weight: 10 }, // B to C
    { start: "C", end: "E", weight: 1 }, // C to E
    { start: "D", end: "B", weight: 5 }, // D to B
    { start: "D", end: "E", weight: 3 }, // D to E
    { start: "E", end: "F", weight: 4 }, // E to F
  ];

  Edge.insertMany(edgesData)
    .then((edges) => console.log("Edges data saved successfully"))
    .catch((err) => console.error("Error saving edges data:", err));
};

module.exports = { getAllNodes, createEdge };
