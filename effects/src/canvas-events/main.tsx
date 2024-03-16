import { render } from "preact";
import { useState } from "preact/hooks";

import { Canvas } from "./Canvas";

console.log("canvas-events");

const size = 256;

function App() {
  const [point, setPoint] = useState({ x: size / 2, y: size / 2 });

  const canvasHandler = (x: number, y: number) => {
    console.log(
      `canvasHandler (${point.x}, ${point.y}) => (${x}, ${y})`
    );
    setPoint({ x: x, y: y });
  };

  return (
    <div style="display: flex; flex-direction: column; align-items: start;">
      <input
        style="flex: 1 1 auto;"
        type="range"
        max={size}
        value={point.x}
        onInput={(e) => {
          setPoint({
            ...point,
            x: Number.parseFloat(e.currentTarget.value),
          });
        }}
      />
      <input
        type="range"
        max={size}
        value={point.y}
        onInput={(e) => {
          setPoint({
            ...point,
            y: Number.parseFloat(e.currentTarget.value),
          });
        }}
      />
      <Canvas
        point={point}
        width={size}
        height={size}
        callback={canvasHandler}
      />
    </div>
  );
}

render(<App />, document.body);
