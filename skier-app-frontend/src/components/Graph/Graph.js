import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";

const Graph = () => {
  const [circles, setCircles] = useState([
    { x: 200, y: 200, text: "A1", textx: 170, texty: 180 },
    { x: 300, y: 300, text: "A2", textx: 270, texty: 290 },
    { x: 500, y: 430, text: "A3", textx: 510, texty: 420 },
    { x: 250, y: 612, text: "A4", textx: 255, texty: 617 },
    { x: 624, y: 218, text: "A5", textx: 629, texty: 224 },
    { x: 534, y: 542, text: "A6", textx: 538, texty: 548 },
  ]);
  const [edges, setEdges] = useState([
    { startx: 200, starty: 200, endx: 300, endy: 300, weight: 4 },
    { startx: 300, starty: 300, endx: 500, endy: 430, weight: 5 },
    { startx: 500, starty: 430, endx: 250, endy: 612, weight: 12 },
    { startx: 500, starty: 430, endx: 624, endy: 218, weight: 7 },
    { startx: 500, starty: 430, endx: 534, endy: 542, weight: 9 },
  ]);
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {circles.map((circle) => {
          return (
            <div>
              <Text
                x={circle.textx}
                y={circle.texty}
                text={circle.text}
                fontSize={15}
                fill="white"
              />
              <Circle x={circle.x} y={circle.y} radius={10} fill="green" />
            </div>
          );
        })}

        {edges.map((edge) => {
          return (
            <div>
              <Text
                x={(edge.startx + edge.endx) / 2 + 20}
                y={(edge.starty + edge.endy) / 2}
                text={edge.weight}
                fontSize={15}
                fill="white"
              />
              <Line
                points={[edge.startx, edge.starty, edge.endx, edge.endy]}
                stroke="white"
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
  );
};

export default Graph;
