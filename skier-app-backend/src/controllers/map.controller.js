const Restroom = require("../models/restroom.model");
const Station = require("../models/station.model");
const Restaurant = require("../models/restaurant.model");
const Node = require("../models/node.model");
const Edge = require("../models/edge.model");

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
  const { startPoint, endPoint, difficulty } = req.body;

  if (!startPoint || !endPoint)
    return res.json({
      status: "error",
      error: "Please provide both startpoint and endpoint",
    });

  const nodes = await Node.find({}, "-_id -__v");
  const edges = await Edge.find({}, "-_id -__v");

  // Construct adjacency list
  const adjacencyList = {};

  // Iterate over nodes and initialize empty adjacency lists
  nodes.forEach((node) => {
    adjacencyList[node.text] = [];
  });

  // Populate adjacency lists with edges
  edges.forEach((edge) => {
    adjacencyList[edge.start].push({ node: edge.end, weight: edge.weight });
  });

  console.log(adjacencyList);

  processNode();
  const { distances, reconstructPath } = dijkstra(adjacencyList, startPoint);

  let shortestPath = reconstructPath(endPoint);
  // console.log("Shortest distances:", distances);
  // console.log(path);

  return res.json({ status: "ok", shortestPath });
};

const dijkstra = (graph, startNode) => {
  const distances = {};
  const previous = {};
  const unvisited = [];

  // Initialize distances and previous nodes
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.push(node);
  }
  distances[startNode] = 0;

  // Dijkstra's algorithm
  while (unvisited.length > 0) {
    // Sort unvisited nodes by distance
    unvisited.sort((a, b) => distances[a] - distances[b]);
    const currentNode = unvisited.shift();

    // Loop through neighbors of the current node
    for (const neighbor of graph[currentNode]) {
      const { node, weight } = neighbor;
      const currentDistance = distances[currentNode] + weight;

      // If the distance to the neighbor is shorter
      if (currentDistance < distances[node]) {
        distances[node] = currentDistance;
        previous[node] = currentNode;
      }
    }
  }

  // Reconstruct the shortest path
  const reconstructPath = (endPoint) => {
    const shortestPath = [];
    let currentNode = endPoint;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = previous[currentNode];
    }
    return shortestPath;
  };

  return { distances, reconstructPath };
};

module.exports = { getCoordinates, getShortestPath };
