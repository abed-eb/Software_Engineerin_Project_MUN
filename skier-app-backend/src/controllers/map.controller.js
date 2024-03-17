const Restroom = require("../models/restroom.model");
const Station = require("../models/station.model");
const Restaurant = require("../models/restaurant.model");

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

  const stations = await Station.find({}).select("-__v");

  // Convert locations array to adjacency list with weights
  // const graph = {};
  // stations.forEach((location1, index1) => {
  //   const nodeName1 = location1.name;
  //   graph[nodeName1] = [];
  //   stations.slice(index1 + 1).forEach((location2) => {
  //     const nodeName2 = location2.name;
  //     const distance = calculateDistance(location1.loc, location2.loc);
  //     graph[nodeName1].push({ node: nodeName2, weight: distance });
  //     graph[nodeName2] = graph[nodeName2] || [];
  //     graph[nodeName2].push({ node: nodeName1, weight: distance });
  //   });
  // });

  // console.log(graph);

  const adjacencyList = {
    A: [
      { node: "B", weight: 10 },
      { node: "D", weight: 5 },
    ],
    B: [{ node: "C", weight: 10 }],
    C: [{ node: "E", weight: 1 }],
    D: [
      { node: "B", weight: 5 },
      { node: "E", weight: 3 },
    ],
    E: [
      { node: "C", weight: 1 },
      { node: "F", weight: 4 },
    ],
    F: [],
  };

  const { distances, reconstructPath } = dijkstra(adjacencyList, startPoint);

  let shortestPath = reconstructPath(endPoint);
  // console.log("Shortest distances:", distances);
  // console.log(path);

  return res.json({ status: "ok", shortestPath });
};

// function calculateDistance(loc1, loc2) {
//   const [lat1, lon1] = loc1;
//   const [lat2, lon2] = loc2;
//   const R = 6371e3; // Radius of the Earth in meters
//   const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const distance = R * c; // Distance in meters
//   return distance;
// }

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
