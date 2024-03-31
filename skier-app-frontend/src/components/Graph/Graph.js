import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text, Circle, Line, Image } from "react-konva";
import flag from "../../Assets/flag.png";
import startFlag from "../../Assets/start.png";
import endFlag from "../../Assets/end.png";
import useImage from "use-image";
import axios from "axios";
const Graph = () => {
  const [flagIcon] = useImage(flag);
  const [startFlagIcon] = useImage(startFlag);
  const [endFlagIcon] = useImage(endFlag);
  // const [iconSrc, SetIconSrc] = useState(image);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const [criteria, setCriteria] = useState("Easiest");
  const [difficulty, setDifficulty] = useState("Blue");
  const difficultyOptions = [
    { id: 0, value: "All" },
    { id: 1, value: "Blue" },
    { id: 2, value: "Red" },
    { id: 3, value: "Black" },
  ];
  const typeOptions = [
    { id: 0, value: "Easiest" },
    { id: 2, value: "Shortest" },
    { id: 2, value: "Most Scenic" },
    { id: 4, value: "Most Difficult" },
  ];
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [rawPoints, setRawPoints] = useState([]);
  const [rawLines, setRawLines] = useState([]);

  useEffect(() => {
    getGraph();
    // let nodesCopy = [...nodes];
    // let edgeCopy = [...edges];
    // for (let i = 0; i < nodesCopy.length; i++) {
    //   const point = nodesCopy[i];
    //   let p = {
    //     x: point?.x,
    //     y: point?.y,
    //     text: point.text,
    //     textx: point?.x - 20,
    //     texty: point?.y - 30,
    //     fill: "green",
    //   };
    //   nodesCopy[i] = p;
    // }
    // setNodes(nodesCopy);
    // for (let j = 0; j < edgeCopy.length; j++) {
    //   const edge = edgeCopy[j];
    //   let start = nodesCopy.filter((p) => {
    //     return p.text === edge.start;
    //   });
    //   let end = nodesCopy.filter((p) => {
    //     return p.text === edge.end;
    //   });
    //   let e = {
    //     startName: edge.start,
    //     startx: start[0]?.x,
    //     starty: start[0]?.y,
    //     endName: edge.end,
    //     endx: end[0]?.x,
    //     endy: end[0]?.y,
    //     weight: edge.weight,
    //     midx: (start[0]?.x + end[0]?.x) / 2,
    //     midy: (start[0]?.y + end[0]?.y) / 2,
    //     // fill: "rgba(255,0,0,0)",
    //     fill: edge.color,
    //     strokeWidth: 1,
    //     // tension: 3,
    //   };
    //   edgeCopy[j] = e;
    // }
    // setEdges(edgeCopy);
  }, []);

  useEffect(() => {
    showPath();
  }, [shortestPath]);

  useEffect(() => {
    setData();
  }, [rawLines, rawPoints]);

  const showPath = () => {
    console.log(shortestPath);
    if (shortestPath.length > 0) {
      let edgesCopy = [...edges];
      let shortestPathCopy = [...shortestPath];
      for (let i = 0; i < edgesCopy.length; i++) {
        const edge = edgesCopy[i];
        for (let j = 0; j < shortestPathCopy.length; j++) {
          const e = shortestPathCopy[j];
          console.log("shortest: ", e);
          if (edge.startName === "H") console.log("edge: ", edge);
          if (
            e.start === edge.startName &&
            e.end === edge.endName &&
            e.name === edge.name
          ) {
            console.log("found");
            console.log(edgesCopy[i].fill);
            edgesCopy[i].strokeWidth = 8;
          } else if (
            e.end === edge.startName &&
            e.start === edge.endName &&
            e.name === edge.name
          ) {
            console.log("found");
            console.log(edgesCopy[i].fill);
            edgesCopy[i].strokeWidth = 8;
          }
        }
      }
      setEdges(edgesCopy);
    }
  };

  const selectStation = (name) => {
    if (start === null) setStart(nodes.filter((n) => n.text === name));
    else if (end === null) setEnd(nodes.filter((n) => n.text === name));
    else {
      setEnd(null);
      // setEdges(initialEdges);
      getGraph();
      setShortestPath([]);
      setStart(nodes.filter((c) => c.text === name));
    }
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleCriteriaChange = (e) => {
    console.log(e.target.value);
    setCriteria(e.target.value);
  };
  const getShortestPath = async () => {
    if (start && end && difficulty)
      axios
        .post("//localhost:4000/api/v1/shortest-path", {
          startPoint: start[0].text,
          endPoint: end[0].text,
          difficulty: difficulty,
          criteria: criteria,
        })
        .then((res) => {
          console.log(res.data);
          setShortestPath(res.data.shortestPath);
        })
        .catch((err) => {
          console.log(err);
        });
    else console.log("Please select points");
  };

  const getGraph = async () => {
    axios
      .get("http://localhost:4000/api/v1/node/nodes")
      .then((res) => {
        console.log(res.data);
        let points = res.data.nodes;
        let lines = res.data.edges;
        setRawLines(lines);
        setRawPoints(points);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setData = () => {
    let points = [...rawPoints];
    let lines = [...rawLines];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      let p = {
        x: point?.x,
        y: point?.y,
        text: point.text,
        textx: point?.x - 20,
        texty: point?.y - 30,
        fill: "green",
      };
      points[i] = p;
    }
    setNodes(points);
    for (let j = 0; j < lines.length; j++) {
      const edge = lines[j];
      let start = points.filter((p) => {
        return p.text === edge.start;
      });
      let end = points.filter((p) => {
        return p.text === edge.end;
      });
      let e = {
        startName: edge.start,
        startx: start[0]?.x,
        starty: start[0]?.y,
        endName: edge.end,
        endx: end[0]?.x,
        endy: end[0]?.y,
        weight: edge?.weight,
        midx: (start[0]?.x + end[0]?.x) / 2,
        midy: (start[0]?.y + end[0]?.y) / 2,
        fill: edge.color,
        strokeWidth: 1,
        name: edge.name,
      };
      lines[j] = e;
    }
    console.log(lines);
    setEdges(lines);
    setInitialEdges(lines);
  };

  return (
    <div>
      <div className="m-2 grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-4 d-flex items-center content-center">
        <div>
          <label
            htmlFor="difficulties"
            className="block mb-2 text-sm font-medium text-gray-900 text black"
          >
            Select Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => handleDifficultyChange(e)}
            id="difficulties"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {difficultyOptions.map((d) => {
              return <option value={d.value}>{d.value}</option>;
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="difficulties"
            className="block mb-2 text-sm font-medium text-gray-900 text black"
          >
            Select Path Type
          </label>
          <select
            value={criteria}
            onChange={(e) => handleCriteriaChange(e)}
            id="difficulties"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {typeOptions.map((t) => {
              return <option value={t.value}>{t.value}</option>;
            })}
          </select>
        </div>
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded p-5 md:mt-6"
          onClick={getShortestPath}
        >
          show path
        </button>
      </div>
      <Stage width={2000} height={2000}>
        <Layer>
          {nodes.map((circle) => {
            return (
              <div>
                <Text
                  x={circle?.textx - 10}
                  y={circle?.texty + 20}
                  text={circle.text}
                  fontSize={15}
                  fill="black"
                />
                <Image
                  onClick={() => selectStation(circle.text)}
                  x={circle?.x - 10}
                  y={circle?.y - 20}
                  image={
                    start && circle.text === start[0]?.text
                      ? startFlagIcon
                      : end && circle.text === end[0]?.text
                      ? endFlagIcon
                      : flagIcon
                  }
                  width={30}
                  height={30}
                />
              </div>
            );
          })}

          {edges.map((edge) => {
            return (
              <>
                <Text
                  x={(edge.startx + edge.endx) / 2}
                  y={(edge.starty + edge.endy) / 2}
                  text={edge.name.includes("Lift") ? edge.name : ""}
                  // text={!edge.name.includes("Lift") ? edge.weight : ""}
                  fontSize={8}
                  fill="#56cfff"
                />
                <Line
                  onClick={() => console.log("hiiii")}
                  points={
                    edge.fill === "green"
                      ? [edge.startx, edge.starty, edge.endx, edge.endy]
                      : edge.fill === "red" || edge.fill === "black"
                      ? [
                          edge.startx,
                          edge.starty,
                          edge.midx,
                          edge.starty,
                          edge.endx,
                          edge.endy,
                        ]
                      : [
                          edge.startx,
                          edge.starty,
                          edge.midx,
                          edge.endy,
                          edge.endx,
                          edge.endy,
                        ]
                  }
                  stroke={edge.fill}
                  strokeWidth={edge.strokeWidth}
                  lineCap="round"
                  tension={0.5}
                />
              </>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Graph;
