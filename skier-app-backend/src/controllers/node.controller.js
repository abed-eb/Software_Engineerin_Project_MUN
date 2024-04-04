const Node = require("../models/node.model");
const Edge = require("../models/edge.model");
const ProcessedEdge = require("../models/pedge.model");

const createEdge = () => {
  const NodesData = [
    { x: 250, y: 530, text: "A" },
    { x: 200, y: 220, text: "B" },
    { x: 490, y: 570, text: "C" },
    { x: 390, y: 350, text: "D" },
    { x: 330, y: 120, text: "E" },
    { x: 434, y: 189, text: "F" },
    { x: 530, y: 325, text: "G" },
    { x: 690, y: 355, text: "H" },
    { x: 790, y: 355, text: "I" },
    { x: 970, y: 375, text: "J" },
    { x: 1020, y: 475, text: "K" },
    { x: 1200, y: 330, text: "L" },
    { x: 890, y: 268, text: "M" },
    { x: 870, y: 215, text: "O" },
    { x: 1000, y: 180, text: "N" },
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
      color: "black",
    }, // A to G
    {
      start: "A",
      end: "G",
      weight: 0,
      name: "Lift 1",
      color: "green",
    }, // A to G
    {
      start: "B",
      end: "E",
      weight: 1400,
      name: "24 Weitentalabfahrt",
      color: "blue",
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
      weight: 0,
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
      weight: 0,
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
      weight: 0,
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
      weight: 0,
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
      weight: 0,
      name: "Lift 6",
      color: "green",
    }, // E to F
    {
      start: "G",
      end: "H",
      weight: 0,
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
      weight: 0,
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
      weight: 0,
      name: "Lift 9",
      color: "green",
    }, // I to J
    {
      start: "I",
      end: "L",
      weight: 0,
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
      weight: 0,
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
      weight: 0,
      name: "Lift 12",
      color: "green",
    }, // J to K
    {
      start: "K",
      end: "L",
      weight: 1500,
      name: "14 Schafalmabfahrt",
      color: "blue",
    }, // K to L
    {
      start: "K",
      end: "L",
      weight: 0,
      name: "Lift 13",
      color: "green",
    }, // K to L
    {
      start: "K",
      end: "L",
      weight: 1000,
      name: "15 Schafnase",
      color: "black",
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
      weight: 0,
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
      weight: 0,
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
      color: "black",
    }, // A to G
    {
      start: "G",
      end: "A",
      weight: 1550,
      name: "21 Eisenhutabfahrt",
      color: "black",
    }, // G to A
    {
      start: "A",
      end: "G",
      weight: 999999,
      name: "Lift 1",
      color: "green",
    }, // A to G
    {
      start: "G",
      end: "A",
      weight: 999999,
      name: "Lift 1",
      color: "green",
    }, // G to A
    {
      start: "B",
      end: "E",
      weight: 1400,
      name: "24 Weitentalabfahrt",
      color: "blue",
    }, // B to E
    {
      start: "E",
      end: "B",
      weight: 1400,
      name: "24 Weitentalabfahrt",
      color: "blue",
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
      weight: 999999,
      name: "Lift 2",
      color: "green",
    }, // B to E
    {
      start: "E",
      end: "B",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 3",
      color: "green",
    }, // C to G
    {
      start: "G",
      end: "C",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 4",
      color: "green",
    }, // D to G
    {
      start: "G",
      end: "D",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 5",
      color: "green",
    }, // D to E
    {
      start: "E",
      end: "D",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 6",
      color: "green",
    }, // E to F
    {
      start: "F",
      end: "E",
      weight: 999999,
      name: "Lift 6",
      color: "green",
    }, // F to E
    {
      start: "G",
      end: "H",
      weight: 999999,
      name: "Lift 7",
      color: "green",
    }, // G to H
    {
      start: "H",
      end: "G",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 8",
      color: "green",
    }, // H to I
    {
      start: "I",
      end: "H",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 9",
      color: "green",
    }, // I to J
    {
      start: "J",
      end: "I",
      weight: 999999,
      name: "Lift 9",
      color: "green",
    }, // J to I
    {
      start: "I",
      end: "L",
      weight: 999999,
      name: "Lift 10",
      color: "green",
    }, // I to L
    {
      start: "L",
      end: "I",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 11",
      color: "green",
    }, // I to M
    {
      start: "M",
      end: "I",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 12",
      color: "green",
    }, // J to K
    {
      start: "K",
      end: "J",
      weight: 999999,
      name: "Lift 12",
      color: "green",
    }, // K to J
    {
      start: "K",
      end: "L",
      weight: 1000,
      name: "15 Schafnase",
      color: "black",
    }, // K to L
    {
      start: "L",
      end: "K",
      weight: 1000,
      name: "15 Schafnase",
      color: "black",
    }, // L to K
    {
      start: "K",
      end: "L",
      weight: 1500,
      name: "14 Schafalmabfahrt",
      color: "blue",
    }, // K to L
    {
      start: "L",
      end: "K",
      weight: 1500,
      name: "14 Schafalmabfahrt",
      color: "blue",
    }, // L to K
    {
      start: "K",
      end: "L",
      weight: 999999,
      name: "Lift 13",
      color: "green",
    }, // K to L
    {
      start: "L",
      end: "K",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 14",
      color: "green",
    }, // M to O
    {
      start: "O",
      end: "M",
      weight: 999999,
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
      weight: 999999,
      name: "Lift 15",
      color: "green",
    }, // O to N
    {
      start: "N",
      end: "O",
      weight: 999999,
      name: "Lift 15",
      color: "green",
    }, // N to O
  ];

  ProcessedEdge.insertMany(edgesData)
    .then((edges) => console.log("Edges data saved successfully"))
    .catch((err) => console.error("Error saving pedges data:", err));
};

module.exports = { createEdge, createProcessedEdge };
