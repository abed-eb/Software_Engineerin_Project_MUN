const Node = require("../models/node.model");
const Edge = require("../models/edge.model");
const ProcessedEdge = require("../models/pedge.model");

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
    { x: 250, y: 612, text: "A" },
    { x: 200, y: 220, text: "B" },
    { x: 390, y: 590, text: "C" },
    { x: 310, y: 350, text: "D" },
    { x: 330, y: 120, text: "E" },
    { x: 434, y: 189, text: "F" },
    { x: 430, y: 325, text: "G" },
    { x: 690, y: 355, text: "H" },
    { x: 790, y: 355, text: "I" },
    { x: 934, y: 375, text: "J" },
    { x: 1000, y: 475, text: "K" },
    { x: 1200, y: 90, text: "L" },
    { x: 890, y: 268, text: "M" },
    { x: 790, y: 255, text: "O" },
    { x: 990, y: 180, text: "N" },
  ];

  Node.insertMany(NodesData)
    .then((nodes) => console.log("Stations data saved successfully"))
    .catch((err) => console.error("Error saving stations data:", err));

  // Define and save edges data
  const edgesData = [
    {
      start: "A",
      end: "G",
      weight: 2100,
      name: "20 FIS - Abfahrt",
      color: "red",
    }, // A to G
    {
      start: "A",
      end: "G",
      weight: 1550,
      name: "21 Eisenhutabfahrt",
      color: "red",
    }, // A to G
    {
      start: "A",
      end: "G",
      weight: 1000,
      name: "Lift 1",
      color: "green",
    }, // A to G
    {
      start: "B",
      end: "E",
      weight: 1400,
      name: "24 Weitentalabfahrt",
      color: "red",
    }, // B to E
    {
      start: "B",
      end: "E",
      weight: 1450,
      name: "23 Schwarzseeabfahrt",
      color: "red",
    }, // B to E
    {
      start: "B",
      end: "E",
      weight: 1250,
      name: "Lift 2",
      color: "green",
    }, // B to E
    {
      start: "C",
      end: "G",
      weight: 1200,
      name: "19 Zirbenwaldabfahrt",
      color: "red",
    }, // C to G
    {
      start: "C",
      end: "G",
      weight: 1800,
      name: "18 Märchenwaldabfahrt",
      color: "blue",
    }, // C to G
    {
      start: "C",
      end: "G",
      weight: 1340,
      name: "Lift 3",
      color: "green",
    }, // C to G
    {
      start: "D",
      end: "G",
      weight: 650,
      name: "36 Alibi für Seitensprung",
      color: "blue",
    }, // D to G
    {
      start: "D",
      end: "G",
      weight: 500,
      name: "Lift 4",
      color: "green",
    }, // D to G
    {
      start: "D",
      end: "E",
      weight: 900,
      name: "22 Seitensprung",
      color: "red",
    }, // D to E
    {
      start: "D",
      end: "E",
      weight: 900,
      name: "Lift 5",
      color: "green",
    }, // D to E
    {
      start: "E",
      end: "F",
      weight: 830,
      name: "25 Abfahrt Sonnenbahn",
      color: "red",
    }, // E to F
    {
      start: "E",
      end: "F",
      weight: 880,
      name: "32 Skiweg zur Sonnenbahn",
      color: "blue",
    }, // E to F
    {
      start: "E",
      end: "F",
      weight: 750,
      name: "Lift 6",
      color: "green",
    }, // E to F
    {
      start: "G",
      end: "H",
      weight: 600,
      name: "Lift 7",
      color: "green",
    }, // G to H
    {
      start: "G",
      end: "H",
      weight: 600,
      name: "26 Wildkopfabfahrt",
      color: "blue",
    }, // G to H
    {
      start: "H",
      end: "I",
      weight: 300,
      name: "Lift 8",
      color: "green",
    }, // H to I
    {
      start: "I",
      end: "J",
      weight: 1300,
      name: "3 Pauliabfahrt",
      color: "red",
    }, // I to J
    {
      start: "I",
      end: "J",
      weight: 1000,
      name: "Lift 9",
      color: "green",
    }, // I to J
    {
      start: "I",
      end: "L",
      weight: 2200,
      name: "Lift 10",
      color: "green",
    }, // I to L
    {
      start: "I",
      end: "L",
      weight: 2350,
      name: "1 Kornockabfahrt",
      color: "blue",
    }, // I to L
    {
      start: "I",
      end: "M",
      weight: 300,
      name: "5 Engländerabfahrt",
      color: "red",
    }, // I to M
    {
      start: "I",
      end: "M",
      weight: 260,
      name: "Lift 11",
      color: "green",
    }, // I to M
    {
      start: "J",
      end: "K",
      weight: 1970,
      name: "17 Lampelabfahrt",
      color: "blue",
    }, // J to K
    {
      start: "J",
      end: "K",
      weight: 1790,
      name: "Lift 12",
      color: "green",
    }, // J to K
    {
      start: "K",
      end: "L",
      weight: 1500,
      name: "14 Schafalmabfahrt",
      color: "black",
    }, // K to L
    {
      start: "K",
      end: "L",
      weight: 1625,
      name: "Lift 13",
      color: "green",
    }, // K to L
    {
      start: "M",
      end: "O",
      weight: 500,
      name: "7 Übungswiesenabfahrt rechts",
      color: "black",
    }, // M to O
    {
      start: "M",
      end: "O",
      weight: 500,
      name: "Lift 14",
      color: "green",
    }, // M to O
    {
      start: "O",
      end: "N",
      weight: 950,
      name: "12 Panoramaabfahrt",
      color: "red",
    }, // O to N
    {
      start: "O",
      end: "N",
      weight: 800,
      name: "Lift 15",
      color: "green",
    }, // O to N
  ];

  Edge.insertMany(edgesData)
    .then((edges) => console.log("Edges data saved successfully"))
    .catch((err) => console.error("Error saving edges data:", err));
};

const createProcessedEdge = () => {
  // Define and save edges data
  const edgesData = [
    {
      start: "A",
      end: "G",
      weight: 2100,
      name: "20 FIS - Abfahrt",
      color: "red",
    }, // A to G
    {
      start: "G",
      end: "A",
      weight: 2100,
      name: "20 FIS - Abfahrt",
      color: "red",
    }, // G to A
    {
      start: "A",
      end: "G",
      weight: 1550,
      name: "21 Eisenhutabfahrt",
      color: "red",
    }, // A to G
    {
      start: "G",
      end: "A",
      weight: 1550,
      name: "21 Eisenhutabfahrt",
      color: "red",
    }, // G to A
    {
      start: "A",
      end: "G",
      weight: 1000,
      name: "Lift 1",
      color: "green",
    }, // A to G
    {
      start: "G",
      end: "A",
      weight: 1000,
      name: "Lift 1",
      color: "green",
    }, // G to A
    {
      start: "B",
      end: "E",
      weight: 1400,
      name: "24 Weitentalabfahrt",
      color: "red",
    }, // B to E
    {
      start: "E",
      end: "B",
      weight: 1400,
      name: "24 Weitentalabfahrt",
      color: "red",
    }, // E to B
    {
      start: "B",
      end: "E",
      weight: 1450,
      name: "23 Schwarzseeabfahrt",
      color: "red",
    }, // B to E
    {
      start: "E",
      end: "B",
      weight: 1450,
      name: "23 Schwarzseeabfahrt",
      color: "red",
    }, // E to B
    {
      start: "B",
      end: "E",
      weight: 1250,
      name: "Lift 2",
      color: "green",
    }, // B to E
    {
      start: "E",
      end: "B",
      weight: 1250,
      name: "Lift 2",
      color: "green",
    }, // E to B
    {
      start: "C",
      end: "G",
      weight: 1200,
      name: "19 Zirbenwaldabfahrt",
      color: "red",
    }, // C to G
    {
      start: "G",
      end: "C",
      weight: 1200,
      name: "19 Zirbenwaldabfahrt",
      color: "red",
    }, // G to C
    {
      start: "C",
      end: "G",
      weight: 1800,
      name: "18 Märchenwaldabfahrt",
      color: "blue",
    }, // C to G
    {
      start: "G",
      end: "C",
      weight: 1800,
      name: "18 Märchenwaldabfahrt",
      color: "blue",
    }, // G to C
    {
      start: "C",
      end: "G",
      weight: 1340,
      name: "Lift 3",
      color: "green",
    }, // C to G
    {
      start: "G",
      end: "C",
      weight: 1340,
      name: "Lift 3",
      color: "green",
    }, // G to C
    {
      start: "D",
      end: "G",
      weight: 650,
      name: "36 Alibi für Seitensprung",
      color: "blue",
    }, // D to G
    {
      start: "G",
      end: "D",
      weight: 650,
      name: "36 Alibi für Seitensprung",
      color: "blue",
    }, // G to D
    {
      start: "D",
      end: "G",
      weight: 500,
      name: "Lift 4",
      color: "green",
    }, // D to G
    {
      start: "G",
      end: "D",
      weight: 500,
      name: "Lift 4",
      color: "green",
    }, // G to D
    {
      start: "D",
      end: "E",
      weight: 900,
      name: "22 Seitensprung",
      color: "red",
    }, // D to E
    {
      start: "E",
      end: "D",
      weight: 900,
      name: "22 Seitensprung",
      color: "red",
    }, // E to D
    {
      start: "D",
      end: "E",
      weight: 850,
      name: "Lift 5",
      color: "green",
    }, // D to E
    {
      start: "E",
      end: "D",
      weight: 850,
      name: "Lift 5",
      color: "green",
    }, // E to D
    {
      start: "E",
      end: "F",
      weight: 830,
      name: "25 Abfahrt Sonnenbahn",
      color: "red",
    }, // E to F
    {
      start: "F",
      end: "E",
      weight: 830,
      name: "25 Abfahrt Sonnenbahn",
      color: "red",
    }, // F to E
    {
      start: "E",
      end: "F",
      weight: 880,
      name: "32 Skiweg zur Sonnenbahn",
      color: "blue",
    }, // E to F
    {
      start: "F",
      end: "E",
      weight: 880,
      name: "32 Skiweg zur Sonnenbahn",
      color: "blue",
    }, // F to E
    {
      start: "E",
      end: "F",
      weight: 750,
      name: "Lift 6",
      color: "green",
    }, // E to F
    {
      start: "F",
      end: "E",
      weight: 750,
      name: "Lift 6",
      color: "green",
    }, // F to E
    {
      start: "G",
      end: "H",
      weight: 550,
      name: "Lift 7",
      color: "green",
    }, // G to H
    {
      start: "H",
      end: "G",
      weight: 550,
      name: "Lift 7",
      color: "green",
    }, // H to G
    {
      start: "G",
      end: "H",
      weight: 600,
      name: "26 Wildkopfabfahrt",
      color: "blue",
    }, // G to H
    {
      start: "H",
      end: "G",
      weight: 600,
      name: "26 Wildkopfabfahrt",
      color: "blue",
    }, // H to G
    {
      start: "H",
      end: "I",
      weight: 300,
      name: "Lift  8",
      color: "green",
    }, // H to I
    {
      start: "I",
      end: "H",
      weight: 300,
      name: "Lift 8",
      color: "green",
    }, // I to H
    {
      start: "I",
      end: "J",
      weight: 1300,
      name: "3 Pauliabfahrt",
      color: "red",
    }, // I to J
    {
      start: "J",
      end: "I",
      weight: 1300,
      name: "3 Pauliabfahrt",
      color: "red",
    }, // J to I
    {
      start: "I",
      end: "J",
      weight: 1000,
      name: "Lift 9",
      color: "green",
    }, // I to J
    {
      start: "J",
      end: "I",
      weight: 1000,
      name: "Lift 9",
      color: "green",
    }, // J to I
    {
      start: "I",
      end: "L",
      weight: 2200,
      name: "Lift 10",
      color: "green",
    }, // I to L
    {
      start: "L",
      end: "I",
      weight: 2200,
      name: "Lift 10",
      color: "green",
    }, // L to I
    {
      start: "I",
      end: "L",
      weight: 2350,
      name: "1 Kornockabfahrt",
      color: "blue",
    }, // I to L
    {
      start: "L",
      end: "I",
      weight: 2350,
      name: "1 Kornockabfahrt",
      color: "blue",
    }, // L to I
    {
      start: "I",
      end: "M",
      weight: 300,
      name: "5 Engländerabfahrt",
      color: "red",
    }, // I to M
    {
      start: "M",
      end: "I",
      weight: 300,
      name: "5 Engländerabfahrt",
      color: "red",
    }, // M to I
    {
      start: "I",
      end: "M",
      weight: 260,
      name: "Lift 11",
      color: "green",
    }, // I to M
    {
      start: "M",
      end: "I",
      weight: 260,
      name: "Lift 11",
      color: "green",
    }, // M to I
    {
      start: "J",
      end: "K",
      weight: 1970,
      name: "17 Lampelabfahrt",
      color: "blue",
    }, // J to K
    {
      start: "K",
      end: "J",
      weight: 1970,
      name: "17 Lampelabfahrt",
      color: "blue",
    }, // K to J
    {
      start: "J",
      end: "K",
      weight: 1790,
      name: "Lift 12",
      color: "green",
    }, // J to K
    {
      start: "K",
      end: "J",
      weight: 1790,
      name: "Lift 12",
      color: "green",
    }, // K to J
    {
      start: "K",
      end: "L",
      weight: 1500,
      name: "14 Schafalmabfahrt",
      color: "black",
    }, // K to L
    {
      start: "L",
      end: "K",
      weight: 1500,
      name: "14 Schafalmabfahrt",
      color: "black",
    }, // L to K
    {
      start: "K",
      end: "L",
      weight: 1625,
      name: "Lift 13",
      color: "green",
    }, // K to L
    {
      start: "L",
      end: "K",
      weight: 1625,
      name: "Lift 13",
      color: "green",
    }, // L to K
    {
      start: "M",
      end: "O",
      weight: 500,
      name: "7 Übungswiesenabfahrt rechts",
      color: "black",
    }, // M to O
    {
      start: "O",
      end: "M",
      weight: 500,
      name: "7 Übungswiesenabfahrt rechts",
      color: "black",
    }, // O to M
    {
      start: "M",
      end: "O",
      weight: 480,
      name: "Lift 14",
      color: "green",
    }, // M to O
    {
      start: "O",
      end: "M",
      weight: 480,
      name: "Lift 14",
      color: "green",
    }, // O to M
    {
      start: "O",
      end: "N",
      weight: 950,
      name: "12 Panoramaabfahrt",
      color: "red",
    }, // O to N
    {
      start: "N",
      end: "O",
      weight: 950,
      name: "12 Panoramaabfahrt",
      color: "red",
    }, // N to O
    {
      start: "O",
      end: "N",
      weight: 800,
      name: "Lift 15",
      color: "green",
    }, // O to N
    {
      start: "N",
      end: "O",
      weight: 800,
      name: "Lift 15",
      color: "green",
    }, // N to O
  ];

  ProcessedEdge.insertMany(edgesData)
    .then((edges) => console.log("Edges data saved successfully"))
    .catch((err) => console.error("Error saving pedges data:", err));
};

module.exports = { getAllNodes, createEdge, createProcessedEdge };
