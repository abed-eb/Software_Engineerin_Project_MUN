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
  let { startPoint, endPoint, difficulty, criteria } = req.body;
  difficulty = difficulty.toLowerCase();
  criteria = criteria.toLowerCase();
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
      if (edge.color === "blue") {
        weightMultiplier = 1;
      } else if (edge.color === "red") {
        weightMultiplier = 1.2;
      } else if (edge.color === "black") {
        weightMultiplier = 2;
      }
      adjacencyList[edge.start].push({
        node: edge.end,
        weight: (edge.weight * weightMultiplier) / 50,
        name: edge.name, // Include the name of the edge
        color: edge.color,
      });
    });
  } else if (criteria === "easiest") {
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
        color: edge.color,
      });
    });
  }
  // Populate adjacency lists with edges
  else if (criteria === "shortest") {
    edges.forEach((edge) => {
      adjacencyList[edge.start].push({
        node: edge.end,
        weight: edge.weight,
        name: edge.name, // Include the name of the edge
        color: edge.color,
      });
    });
  }

  const result = shortestPathHelper(
    adjacencyList,
    startPoint,
    endPoint,
    difficulty
  );
  return res.json({ status: "ok", shortestPath: result.shortestPath });
};

const shortestPathHelper = (
  adjacencyList,
  startNode,
  targetNode,
  difficulty
) => {
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
      const isCorrectColor = neighbor.color === difficulty;
      const isGreenEdge = neighbor.color === "green";

      // Prioritize selected color edge, fallback to green edge
      if (difficulty !== "all") {
        if (
          (isCorrectColor && totalDistance < distances[neighbor.node]) ||
          (!isCorrectColor &&
            isGreenEdge &&
            totalDistance < distances[neighbor.node])
        ) {
          distances[neighbor.node] = totalDistance;
          predecessors[neighbor.node] = {
            node: closestNode,
            name: neighbor.name,
          };
        }
      } else {
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

//Method for getting all paths
const getAllPaths = async (req, res) => {
  let { startPoint, endPoint } = req.body;

  if (!startPoint || !endPoint)
    return res.status(400).json({
      status: "error",
      error: "Please provide both startpoint and endpoint",
    });

  const nodes = await Node.find({}, "-_id -__v");
  const edges = await ProcessedEdge.find({}, "-_id -__v");

  const adjacencyList = {};

  nodes.forEach((node) => {
    adjacencyList[node.text] = [];
  });

  edges.forEach((edge) => {
    adjacencyList[edge.start].push({
      node: edge.end,
      name: edge.name,
    });
  });

  const allPaths = [];
  const path = [];

  getAllPathsHelper(startPoint, endPoint, adjacencyList, path, allPaths);
  console.log(allPaths);

  // Return only if there are paths
  if (allPaths.length) {
    return res.status(200).json({ status: "ok", paths: allPaths });
  } else {
    return res.status(404).json({ status: "error", error: "No paths found" });
  }
};

//Method for finding all Paths (DFS algorithm is used)
const getAllPathsHelper = (currentNode, end, adjacencyList, path, allPaths) => {
  if (currentNode === end) {
    allPaths.push([...path]);
    return;
  }

  for (const neighbor of adjacencyList[currentNode]) {
    const { node, name } = neighbor;
    if (!path.some((edge) => edge.end === node)) {
      path.push({ start: currentNode, end: node, name });
      getAllPathsHelper(node, end, adjacencyList, path, allPaths);
      path.pop();
    }
  }
};

module.exports = { getCoordinates, getShortestPath, getAllPaths };
