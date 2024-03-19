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
  const [difficulty, setDifficulty] = useState("Blue");
  const difficultyOptions = [
    { id: 0, value: "Blue" },
    { id: 2, value: "Red" },
    { id: 2, value: "Black" },
  ];
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [rawPoints, setRawPoints] = useState([]);
  const [rawLines, setRawLines] = useState([]);

  useEffect(() => {
    getGraph();
  }, []);

  useEffect(() => {
    showPath();
  }, [shortestPath]);

  useEffect(() => {
    setData();
  }, [rawLines, rawPoints]);

  useEffect(() => {
    console.log(edges);
  }, [edges]);
  // useEffect(() => {
  //   getShortestPath();
  // }, []);

  // const showPath = () => {
  //   if (shortestPath.length > 0) {
  //     let edgesCopy = [...edges];
  //     let shortestPathCopy = [...shortestPath];
  //     for (let i = 0; i < edgesCopy.length; i++) {
  //       const edge = edgesCopy[i];
  //       if (
  //         shortestPathCopy.includes(edge.startName) &&
  //         shortestPathCopy.includes(edge.endName)
  //       ) {
  //         edgesCopy[i].fill = "red";
  //       }
  //     }
  //     setEdges(edgesCopy);
  //   }
  // };
  const showPath = () => {
    if (shortestPath.length > 0) {
      let edgesCopy = [...edges];
      let shortestPathCopy = [...shortestPath];
      for (let i = 0; i < edgesCopy.length; i++) {
        const edge = edgesCopy[i];
        console.log(edge);
        for (let j = 0; j < shortestPathCopy.length - 1; j++) {
          const e = shortestPathCopy[j];
          console.log("j: " + shortestPathCopy[j]);
          console.log("j+1: " + shortestPathCopy[j + 1]);
          if (
            shortestPathCopy[j] === edge.startName &&
            shortestPathCopy[j + 1] === edge.endName
          ) {
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

  const handleChange = (e) => {
    setDifficulty(e.target.value);
  };

  const getShortestPath = async () => {
    if (start && end && difficulty)
      axios
        .post("//localhost:4000/api/v1/shortest-path", {
          startPoint: start[0].text,
          endPoint: end[0].text,
          difficulty: difficulty,
        })
        .then((res) => {
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
        x: point.x,
        y: point.y,
        text: point.text,
        textx: point.x - 20,
        texty: point.y - 30,
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
        startx: start[0].x,
        starty: start[0].y,
        endName: edge.end,
        endx: end[0].x,
        endy: end[0].y,
        weight: edge.weight,
        // fill: "rgba(255,0,0,0)",
        fill: "Blue",
        strokeWidth: 1,
      };
      lines[j] = e;
    }
    setEdges(lines);
    setInitialEdges(lines);
  };

  return (
    <div>
      <div className="m-2 grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-4 d-flex items-center content-center">
        <div>
          <label
            htmlFor="difficulties"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Difficulty Level
          </label>
          <select
            onChange={(e) => handleChange(e)}
            id="difficulties"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {difficultyOptions.map((d) => {
              return <option value={d.value}>{d.value}</option>;
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
      <Stage width={534 + 50} height={618 + 50}>
        {/* width={534 + 200} height={618 + 200} */}
        <Layer>
          {nodes.map((circle) => {
            return (
              <div>
                <Text
                  x={circle.textx - 10}
                  y={circle.texty * 1.1}
                  text={circle.text}
                  fontSize={15}
                  fill="black"
                />
                <Image
                  onClick={() => selectStation(circle.text)}
                  x={circle.x - 10}
                  y={circle.y - 20}
                  image={
                    start && circle.text === start[0].text
                      ? startFlagIcon
                      : end && circle.text === end[0].text
                      ? endFlagIcon
                      : flagIcon
                  }
                  width={50}
                  height={50}
                />
                {/* <Circle
                  onClick={() => selectStation(circle.text)}
                  x={circle.x}
                  y={circle.y}
                  radius={10}
                  fill="green"
                /> */}
              </div>
            );
          })}

          {edges.map((edge) => {
            return (
              <div>
                <Text
                  x={(edge.startx + 18 + edge.endx + 18) / 2}
                  y={(edge.starty + 5 + edge.endy + 5) / 2}
                  text={edge.weight}
                  fontSize={15}
                  fill="#56cfff"
                />
                {console.log(edge.startName, edge.endName, edge.fill)}
                <Line
                  points={[edge.startx, edge.starty, edge.endx, edge.endy]}
                  stroke={edge.fill}
                  strokeWidth={edge.strokeWidth}
                />
              </div>
            );
          })}
          {/* <Text x={210} y={100} text="A1" fontSize={15} fill="white" />

        <Circle x={300} y={300} radius={10} fill="green" />
        <Circle x={500} y={430} radius={10} fill="green" />
        <Circle x={250} y={612} radius={10} fill="green" /> */}
          {/* <Line points={[200, 100, 300, 300]} stroke="white" /> */}
          {/* <Line
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.5}
          closed
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
        /> */}
        </Layer>
      </Stage>
    </div>
  );
};

export default Graph;
