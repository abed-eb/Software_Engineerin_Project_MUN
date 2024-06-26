import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text, Circle, Line, Image } from "react-konva";
import flag from "../../Assets/flag.png";
import startFlag from "../../Assets/start.png";
import endFlag from "../../Assets/end.png";
import useImage from "use-image";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
    { id: 1, value: "Shortest" },
    { id: 2, value: "Fastest" },
  ];
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [rawPoints, setRawPoints] = useState([]);
  const [rawLines, setRawLines] = useState([]);
  const [edgeName, setEdgeName] = useState("");
  const [edgeWeight, setEdgeWeight] = useState(0);
  const [edgeColor, setEdgeColor] = useState("");
  const [edgeDataVisible, setEdgeDataVisible] = useState(false);
  const [blueSelected, setBlueSelected] = useState(true);
  const [redSelected, setRedSelected] = useState(true);
  const [blackSelected, setBlackSelected] = useState(true);
  const [allPaths, setAllPath] = useState([]);
  const [shortestPathDist, setShortestPathDist] = useState(0);

  useEffect(() => {
    let points = [...nodes];
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
    getGraph();
  }, []);

  useEffect(() => {
    showPath();
  }, [shortestPath]);

  useEffect(() => {
    setData();
  }, [rawLines, rawPoints]);

  const showPath = () => {
    if (shortestPath.length > 0) {
      let edgesCopy = [...edges];
      let shortestPathCopy = [...shortestPath];
      for (let i = 0; i < edgesCopy.length; i++) {
        const edge = edgesCopy[i];
        for (let j = 0; j < shortestPathCopy.length; j++) {
          const e = shortestPathCopy[j];
          if (
            e.start === edge.startName &&
            e.end === edge.endName &&
            e.name === edge.name
          ) {
            edgesCopy[i].strokeWidth = 3;
            edgesCopy[i].dash = [10, 5];
          } else if (
            e.end === edge.startName &&
            e.start === edge.endName &&
            e.name === edge.name
          ) {
            edgesCopy[i].strokeWidth = 3;
            edgesCopy[i].dash = [10, 5];
          }
        }
      }
      setEdges(edgesCopy);
    }
  };

  const showAllPaths = (pathList) => {
    pathList.forEach((path) => {
      if (path.length > 0) {
        let edgesCopy = [...edges];
        let pathCopy = [...path];
        for (let i = 0; i < edgesCopy.length; i++) {
          const edge = edgesCopy[i];
          for (let j = 0; j < pathCopy.length; j++) {
            const e = pathCopy[j];
            if (
              e.start === edge.startName &&
              e.end === edge.endName &&
              e.name === edge.name
            ) {
              edgesCopy[i].strokeWidth = 3;
              edgesCopy[i].dash = [10, 5];
            } else if (
              e.end === edge.startName &&
              e.start === edge.endName &&
              e.name === edge.name
            ) {
              edgesCopy[i].strokeWidth = 3;
              edgesCopy[i].dash = [10, 5];
            }
          }
        }
        setEdges(edgesCopy);
      }
    });
  };

  const selectStation = (name) => {
    if (start === null) setStart(nodes.filter((n) => n.text === name));
    else if (end === null) setEnd(nodes.filter((n) => n.text === name));
    else {
      setEnd(null);
      // setEdges(initialEdges);
      setData();
      setShortestPath([]);
      setStart(nodes.filter((c) => c.text === name));
    }
  };

  const showLineDetail = (edge) => {
    setEdgeName(edge.name);
    setEdgeWeight(edge.weight);
    if (edge.fill === "black") setEdgeColor("text-gray-900");
    if (edge.fill === "red") setEdgeColor("text-red-700");
    if (edge.fill === "green") setEdgeColor("text-green-700");
    if (edge.fill === "blue") setEdgeColor("text-blue-700");
    setEdgeDataVisible(true);
  };

  const handleCriteriaChange = (e) => {
    // setData();
    setCriteria(e.target.value);
  };

  const getAllPath = async () => {
    let difficulties = [];
    if (blueSelected) difficulties.push("blue");
    if (redSelected) difficulties.push("red");
    if (blackSelected) difficulties.push("black");
    if (start && end)
      axios
        .post("//localhost:4000/api/v1/all-paths", {
          startPoint: start[0].text,
          endPoint: end[0].text,
          difficulties: difficulties,
        })
        .then((res) => {
          showAllPaths(res.data?.paths);
          setAllPath(res.data?.paths);
          setShortestPath([]);
        })
        .catch((err) => {
          console.log(err);
        });
    else alert("Please select start and end point");
  };

  const getSpecifiedPath = async () => {
    setData();
    let difficulties = [];
    if (blueSelected) difficulties.push("blue");
    if (redSelected) difficulties.push("red");
    if (blackSelected) difficulties.push("black");
    if (start && end && difficulty)
      axios
        .post("//localhost:4000/api/v1/shortest-path", {
          startPoint: start[0].text,
          endPoint: end[0].text,
          difficulties: difficulties,
          criteria: criteria,
        })
        .then((res) => {
          console.log(res);
          setShortestPath(res.data.shortestPath);
          // setShortestPathDist(res.data.cost);
          setAllPath([]);
        })
        .catch((err) => {
          console.log(err);
        });
    else alert("Please select start and end point");
  };

  const getGraph = async () => {
    axios
      .get("http://localhost:4000/api/v1/nodes")
      .then((res) => {
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
        texty: point?.y - 47,
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
        strokeWidth: 2.5,
        name: edge.name,
        dash: [0, 0],
      };
      lines[j] = e;
    }
    setEdges(lines);
    setInitialEdges(lines);
  };
  const handleMouseEnter = (e, edge) => {
    setEdgeName(edge.name);
    setEdgeWeight(edge.weight);
    if (edge.fill === "black") setEdgeColor("text-gray-900");
    if (edge.fill === "red") setEdgeColor("text-red-700");
    if (edge.fill === "green") setEdgeColor("text-green-700");
    if (edge.fill === "blue") setEdgeColor("text-blue-700");
    setEdgeDataVisible(true);
  };

  const handleMouseLeave = () => {
    setEdgeDataVisible(false);
  };

  const handleReset = () => {
    setAllPath([]);
    setShortestPath([]);
    setStart(null);
    setEnd(null);
    setData();
  };

  return (
    <div>
      <div className="text-gray-900 font-bold p-1">
        <h3>
          1. Select start point and end point by clicking on the blue flags in
          the below graph.
        </h3>
        <h3>
          2. You can select your prefered route colors by selecting or
          deselecting the check boxes.
        </h3>
        <h3>4. Use Reset button to remove your changes and start over.</h3>
        <h3>
          5. Each time you change a color or criteria you have to click on the
          button to see the changes.
        </h3>
      </div>
      <div className="mx-2 grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-4 d-flex items-center content-center">
        <button
          className=" bg-purple-500 hover:bg-purple-700 text-white font-bold border border-purple-700 rounded p-5 md:mt-6"
          onClick={getAllPath}
        >
          Show all paths
        </button>
        <button
          className=" bg-gray-600 hover:bg-gray-700 text-white font-bold border border-gray-800 rounded p-5 md:mt-6"
          onClick={handleReset}
        >
          Reset
        </button>
        {(allPaths?.length > 0 || shortestPath.length !== 0) && (
          <>
            <div>
              <label
                htmlFor="difficulties"
                className="block mb-2 text-sm font-medium text-gray-900 text black"
              >
                Select Criteria
              </label>
              <select
                value={criteria}
                onChange={(e) => handleCriteriaChange(e)}
                id="difficulties"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {typeOptions.map((t, index) => {
                  return (
                    <option key={index} value={t.value}>
                      {t.value}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded p-5 md:mt-6"
              onClick={getSpecifiedPath}
            >
              Show path with criteria
            </button>
          </>
        )}

        <div
          className={
            allPaths.length > 0 || shortestPath.length > 0
              ? "mt-5 p-1 text-gray-900 h-32 w-96 overflow-y-auto bg-green-200 rounded"
              : "mt-5 p-1 text-gray-900 h-32 w-full rounded"
          }
        >
          {shortestPath.length > 0 ? (
            <h5 className="font-normal text-md">
              <div className="font-bold text-lg">Suggested Path:</div>
              <div>
                {shortestPath.map((edge, index) => {
                  return (
                    <div key={index}>
                      {index + 1}
                      {". "}
                      {!edge.name.includes("Lift")
                        ? edge.name + " (Slope)"
                        : edge.name}
                    </div>
                  );
                })}
              </div>
            </h5>
          ) : (
            allPaths.length > 0 &&
            allPaths.map((path, index1) => {
              return (
                <div key={index1}>
                  <h3 className="font-bold text-lg">Path {index1 + 1}</h3>
                  {path.map((edge, index2) => {
                    return (
                      <div key={index2 + 100}>
                        {index2 + 1}
                        {". "}
                        {!edge.name?.includes("Lift")
                          ? edge.name + " (Slope)"
                          : edge.name}
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="grid text-gray-900 lg:grid-cols-12 md:grid-cols-8 grid-cols-1 gap-4 d-flex items-center content-center">
        <h4 className="font-bold p-2 text-normal">Difficulty Level: </h4>
        <div className="p-2">
          <label>
            <input
              onChange={() => {
                setBlueSelected(!blueSelected);
                setData();
              }}
              type="checkbox"
              className="accent-blue-500"
              checked={blueSelected}
            />
            blue
          </label>
        </div>
        <div className="p-2 text-gray-900">
          <label>
            <input
              onChange={() => {
                setRedSelected(!redSelected);
                setData();
              }}
              type="checkbox"
              className="accent-red-500"
              checked={redSelected}
            />
            red
          </label>
        </div>
        <div className="p-2 text-gray-900">
          <label>
            <input
              onChange={() => {
                setBlackSelected(!blackSelected);
                setData();
              }}
              type="checkbox"
              className="accent-gray-900"
              checked={blackSelected}
            />
            black
          </label>
        </div>
      </div>
      <div className="p-2 h-3.5 w-full">
        <div className={edgeColor}>
          {edgeDataVisible && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 d-flex items-center content-start">
              <div className="w-full d-flex items-center content-center">
                <div>
                  <h3 className="font-bold text-lg">Slope/Lift Name: </h3>
                  <h5 className="font-normal text-md">{edgeName}</h5>
                </div>
              </div>
              <div className="w-full d-flex items-center content-center">
                <div>
                  <h3 className="font-bold text-lg">Slope/Lift Length: </h3>
                  <h5 className="font-normal text-md">{edgeWeight} m</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Stage width={1450} height={600}>
        <Layer>
          <Text
            x={600}
            y={80}
            text={"Hover on each slope to see the details"}
            fontSize={15}
            fill="#030712"
            fontStyle="bold"
          />
          <Text
            x={20}
            y={500}
            text={"Blue: Easy Slopes"}
            fontSize={12}
            fill="#2563eb"
          />
          <Text
            x={20}
            y={520}
            text={"Red: Medium Slopes"}
            fontSize={12}
            fill="#dc2626"
          />
          <Text
            x={20}
            y={540}
            text={"Black: Difficult Slopes"}
            fontSize={12}
            fill="#020617"
          />
          <Text
            x={20}
            y={560}
            text={"Green: Lifts"}
            fontSize={12}
            fill="#16a34a"
          />
          <Text
            x={20}
            y={580}
            text={"- - - - - : Suggested Path"}
            fontSize={13}
            fontStyle="bold"
            fill="#020617"
          />
          {nodes.map((node, index) => {
            return (
              <div key={index}>
                <Text
                  x={node?.textx - 10}
                  y={node?.texty + 20}
                  text={node.text}
                  fontSize={15}
                  fill="black"
                />
                <Image
                  onClick={() => selectStation(node.text)}
                  x={node?.x - 10}
                  y={node?.y - 20}
                  image={
                    start && node.text === start[0]?.text
                      ? startFlagIcon
                      : end && node.text === end[0]?.text
                      ? endFlagIcon
                      : flagIcon
                  }
                  width={40}
                  height={40}
                />
              </div>
            );
          })}

          {edges.map((edge, index) => {
            return (
              <div key={index}>
                <div data-tooltip-id={edge.name}>
                  <Line
                    // onClick={() => showLineDetail(edge)}
                    points={
                      edge.fill === "green"
                        ? [edge.startx, edge.starty, edge.endx, edge.endy]
                        : edge.fill === "red"
                        ? [
                            edge.startx,
                            edge.starty,
                            edge.midx,
                            edge.starty,
                            edge.endx,
                            edge.endy,
                          ]
                        : edge.fill === "black"
                        ? [
                            edge.startx,
                            edge.starty,
                            edge.midx - 100,
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
                    strokeWidth={3}
                    lineCap="round"
                    tension={0.5}
                    listening
                    dash={edge.dash}
                    onMouseEnter={(e) => handleMouseEnter(e, edge)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              </div>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Graph;
