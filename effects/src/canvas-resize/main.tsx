import { render } from "preact";

import { Canvas } from "./Canvas";

console.log("canvas");

let size = 100;

function App() {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid black",
        height: "100vh",
      }}
    >
      <Canvas width={size} height={size} />
    </div>
  );
}

render(<App />, document.body);
