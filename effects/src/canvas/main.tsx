import { render } from "preact";

import { Canvas } from "./Canvas";

console.log("canvas");

let size = 256;

function App() {
  return <Canvas width={size} height={size} />;
}

render(<App />, document.body);
