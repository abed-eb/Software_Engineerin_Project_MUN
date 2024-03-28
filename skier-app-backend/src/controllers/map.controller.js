const Restroom = require("../models/restroom.model");
const Station = require("../models/station.model");
const Restaurant = require("../models/restaurant.model");
const Node = require("../models/node.model");
const ProcessedEdge = require("../models/pedge.model");
const graph = {
  A: { B: 2, C: 1 },
  B: { A: 2, C: 2, D: 1 },
  C: { A: 1, B: 2, D: 4, E: 3 },
  D: { B: 1, C: 4, E: 3, F: 5 },
  E: { C: 3, D: 3, F: 1 },
  F: { D: 5, E: 1 },
};
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
  const { startPoint, endPoint } = req.body;

  if (!startPoint || !endPoint) {
    return res
      .status(400)
      .json({ error: "Start point and end point are required." });
  }

  if (!graph[startPoint] || !graph[endPoint]) {
    return res
      .status(404)
      .json({ error: "Start point or end point not found in the graph." });
  }

  const { path, distance } = dijkstra(graph, startPoint, endPoint);

  if (path.length === 0 || distance === Infinity) {
    return res
      .status(404)
      .json({ error: "No path found between start and end points." });
  }

  res.json({ path, distance });
  // const { startPoint, endPoint, difficulty } = req.body;

  // if (!startPoint || !endPoint)
  //   return res.json({
  //     status: "error",
  //     error: "Please provide both startpoint and endpoint",
  //   });

  // const nodes = await Node.find({}, "-_id -__v");
  // const edges = await ProcessedEdge.find({}, "-_id -__v");

  // // Construct adjacency list
  // const adjacencyList = {};

  // // Iterate over nodes and initialize empty adjacency lists
  // nodes.forEach((node) => {
  //   adjacencyList[node.text] = [];
  // });

  // // Populate adjacency lists with edges
  // edges.forEach((edge) => {
  //   adjacencyList[edge.start].push({ node: edge.end, weight: edge.weight });
  // });

  // console.log(adjacencyList);

  // // processNode();
  // const { distances, reconstructPath } = dijkstra(adjacencyList, startPoint);

  // let shortestPath = reconstructPath(endPoint);
  // // console.log("Shortest distances:", distances);
  // // console.log(path);

  // return res.json({ status: "ok", shortestPath });
};

const dijkstra = (graph, startNode) => {
  const visited = new Set();
  const distances = {};
  const previous = {};
  let path = [];

  // Set initial distances
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;

  // Dijkstra's algorithm
  while (Object.keys(distances).length > 0) {
    const current = Object.keys(distances).reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    if (current === end) {
      while (previous[current]) {
        path.push(current);
        current = previous[current];
      }
      path.push(start);
      path = path.reverse();
      break;
    }

    visited.add(current);
    delete distances[current];

    for (const neighbor in graph[current]) {
      if (!visited.has(neighbor)) {
        const distance = graph[current][neighbor];
        const totalDistance = distances[current] + distance;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = current;
        }
      }
    }
  }

  return { path, distance: distances[end] };
  // const distances = {};
  // const previous = {};
  // const unvisited = {};

  // // Initialize distances and previous nodes
  // for (const node in graph) {
  //   distances[node] = Infinity;
  //   previous[node] = null;
  //   unvisited[node] = true;
  // }
  // distances[startNode] = 0;

  // // Dijkstra's algorithm
  // while (Object.keys(unvisited).length > 0) {
  //   let minDistanceNode = null;
  //   let minDistance = Infinity;

  //   // Find the node with the minimum distance among unvisited nodes
  //   for (const node in unvisited) {
  //     if (distances[node] < minDistance) {
  //       minDistance = distances[node];
  //       minDistanceNode = node;
  //     }
  //   }

  //   // Remove the node with the minimum distance from unvisited
  //   delete unvisited[minDistanceNode];

  //   // Loop through neighbors of the current node
  //   for (const neighbor of graph[minDistanceNode]) {
  //     const { node, weight } = neighbor;
  //     if (node in unvisited) {
  //       const currentDistance = distances[minDistanceNode] + weight;

  //       // If the distance to the neighbor is shorter
  //       if (currentDistance < distances[node]) {
  //         distances[node] = currentDistance;
  //         previous[node] = minDistanceNode;
  //       }
  //     }
  //   }
  // }

  // // Reconstruct the shortest path
  // const reconstructPath = (endPoint) => {
  //   const shortestPath = [];
  //   let currentNode = endPoint;
  //   while (currentNode !== null) {
  //     shortestPath.unshift(currentNode);
  //     currentNode = previous[currentNode];
  //   }
  //   return shortestPath;
  // };

  // return { distances, reconstructPath };
};

module.exports = { getCoordinates, getShortestPath };
