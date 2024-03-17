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
  const difficultyOptions = [
    { id: 0, value: "Blue" },
    { id: 2, value: "Red" },
    { id: 2, value: "Black" },
  ];

  useEffect(() => {
    getShortestPath();
  }, []);
  const [nodes, setNodes] = useState([
    { x: 200, y: 200, text: "A", textx: 170, texty: 180, fill: "green" },
    { x: 300, y: 300, text: "B", textx: 270, texty: 290, fill: "green" },
    { x: 500, y: 430, text: "C", textx: 510, texty: 420, fill: "green" },
    { x: 250, y: 612, text: "D", textx: 255, texty: 617, fill: "green" },
    { x: 430, y: 618, text: "E", textx: 440, texty: 625, fill: "green" },
    { x: 534, y: 542, text: "F", textx: 538, texty: 548, fill: "green" },
  ]);

  const [edges, setEdges] = useState([
    {
      startName: "A",
      startx: 200,
      starty: 200,
      endName: "B",
      endx: 300,
      endy: 300,
      weight: 10,
      fill: "white",
    },
    {
      startName: "A",
      startx: 200,
      starty: 200,
      endName: "D",
      endx: 250,
      endy: 612,
      weight: 5,
      fill: "white",
    },
    {
      startName: "B",
      startx: 300,
      starty: 300,
      endName: "C",
      endx: 500,
      endy: 430,
      weight: 10,
      fill: "white",
    },
    {
      startName: "C",
      startx: 500,
      starty: 430,
      endName: "E",
      endx: 430,
      endy: 618,
      weight: 1,
      fill: "white",
    },
    {
      startName: "D",
      startx: 250,
      starty: 612,
      endName: "B",
      endx: 300,
      endy: 300,
      weight: 5,
      fill: "white",
    },
    {
      startName: "D",
      startx: 250,
      starty: 612,
      endName: "E",
      endx: 430,
      endy: 618,
      weight: 3,
      fill: "white",
    },
    {
      startName: "E",
      startx: 430,
      starty: 618,
      endName: "F",
      endx: 534,
      endy: 542,
      weight: 4,
      fill: "white",
    },
  ]);

  const showPath = () => {
    let path = [
      ["A", "B", 10],
      ["B", "C", 10],
    ];
    let edgesCopy = [...edges];
    for (let i = 0; i < edgesCopy.length; i++) {
      const edge = edgesCopy[i];
      for (let j = 0; j < path.length; j++) {
        const p = path[j];
        if (
          p[0] == edge.startName &&
          p[1] == edge.endName &&
          p[2] == edge.weight
        ) {
          edgesCopy[i].fill = "red";
        }
      }
    }
    setEdges(edgesCopy);
  };

  const selectStation = (name) => {
    console.log(name);
    console.log(start);
    if (start === null) setStart(nodes.filter((n) => n.text === name));
    else if (end === null) setEnd(nodes.filter((n) => n.text === name));
    else {
      setEnd(null);
      setStart(nodes.filter((c) => c.text === name));
    }
  };

  const getShortestPath = async () => {
    axios
      .post("//localhost:4000/api/v1/shortest-path", {
        startPoint: "A",
        endPoint: "C",
        difficulty: "1",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          onClick={showPath}
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
                  y={circle.texty + 20}
                  text={circle.text}
                  fontSize={15}
                  fill="white"
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
                <Line
                  points={[edge.startx, edge.starty, edge.endx, edge.endy]}
                  stroke={edge.fill}
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
