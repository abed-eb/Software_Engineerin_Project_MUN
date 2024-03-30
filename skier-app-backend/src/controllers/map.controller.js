const Node = require("../models/node.model");
const Restroom = require("../models/restroom.model");
const Station = require("../models/station.model");
const Restaurant = require("../models/restaurant.model");
const ProcessedEdge = require("../models/pedge.model");

// Get all coordinate
const getCoordinates = async (req, res) => {
  try {
    const stations = await Station.find({}).select("-__v");
    const restrooms = await Restroom.find({}).select("-__v");
    const restaurants = await Restaurant.find({}).select("-__v");
    return res.json({ status: "ok", stations, restrooms, restaurants });
  } catch (error) {
    return res.json({ status: "error", error: "No map coordinates found" });
  }
};

const getShortestPath = async (req, res) => {
  const { startPoint, endPoint, difficulty, criteria } = req.body;
  if (!startPoint || !endPoint)
    return res.json({
      status: "error",
      error: "Please provide both startpoint and endpoint",
    });

  const nodes = await Node.find({}, "-_id -__v");
  const edges = await ProcessedEdge.find({}, "-_id -__v");

  // Construct adjacency list
  const adjacencyList = {};

  // Iterate over nodes and initialize empty adjacency lists
  nodes.forEach((node) => {
    adjacencyList[node.text] = [];
  });

  if (criteria === "fastest") {
    // Populate adjacency lists with edges
    edges.forEach((edge) => {
      adjacencyList[edge.start].push({
        node: edge.end,
        weight: edge.weight / 50,
        name: edge.name, // Include the name of the edge
      });
    });
  } else if (criteria === "shortest") {
    edges.forEach((edge) => {
      let weightMultiplier = 1; // Default multiplier
      if (edge.color === "blue") {
        weightMultiplier = 1;
      } else if (edge.color === "red") {
        weightMultiplier = 1.2;
      } else if (edge.color === "black") {
        weightMultiplier = 2;
      }
      adjacencyList[edge.start].push({
        node: edge.end,
        weight: edge.weight * weightMultiplier,
        name: edge.name, // Include the name of the edge
      });
    });
  }
  // Populate adjacency lists with edges
  else
    edges.forEach((edge) => {
      adjacencyList[edge.start].push({
        node: edge.end,
        weight: edge.weight,
        name: edge.name, // Include the name of the edge
      });
    });

  const result = shortestPathHelper(adjacencyList, startPoint, endPoint);
  return res.json({ status: "ok", shortestPath: result.shortestPath });
};

const shortestPathHelper = (adjacencyList, startNode, targetNode) => {
  // Initialize distances with Infinity and predecessor as null
  const distances = {};
  const predecessors = {};
  for (let node in adjacencyList) {
    distances[node] = Infinity;
    predecessors[node] = null;
  }
  distances[startNode] = 0;

  // Create a priority queue
  const queue = Object.keys(adjacencyList);

  // Helper function to get the node with the smallest distance
  function getClosestNode() {
    return queue.reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );
  }

  // Dijkstra's algorithm
  while (queue.length > 0) {
    const closestNode = getClosestNode();
    if (closestNode === targetNode || distances[closestNode] === Infinity) {
      break;
    }
    queue.splice(queue.indexOf(closestNode), 1);

    for (let neighbor of adjacencyList[closestNode]) {
      const totalDistance = distances[closestNode] + neighbor.weight;
      // Modify the condition to check if the node name contains "Lift"
      if (
        !neighbor.name.includes("Lift") &&
        totalDistance < distances[neighbor.node]
      ) {
        distances[neighbor.node] = totalDistance;
        predecessors[neighbor.node] = {
          node: closestNode,
          name: neighbor.name,
        };
      }
    }
  }

  // If there are no nodes without "Lift", select nodes with "Lift"
  if (queue.length === 0) {
    for (let closestNode in adjacencyList) {
      if (closestNode.includes("Lift")) {
        for (let neighbor of adjacencyList[closestNode]) {
          const totalDistance = distances[closestNode] + neighbor.weight;
          if (totalDistance < distances[neighbor.node]) {
            distances[neighbor.node] = totalDistance;
            predecessors[neighbor.node] = {
              node: closestNode,
              name: neighbor.name,
            };
          }
        }
      }
    }
  }

  // Backtrack to find the shortest path with names
  const shortestPath = [];
  let currentNode = targetNode;
  while (currentNode !== null && predecessors[currentNode] !== null) {
    shortestPath.unshift({
      start: predecessors[currentNode].node,
      end: currentNode,
      name: predecessors[currentNode].name,
    });
    currentNode = predecessors[currentNode].node;
  }

  return { cost: distances[targetNode], shortestPath };
};

module.exports = { getCoordinates, getShortestPath };
