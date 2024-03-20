import { render } from "preact";

import { Canvas } from "./Canvas";
import { useEffect, useState } from "preact/hooks";

console.log("canvas");

let size = 256;

function App() {
  return <Canvas width={size} height={size} />;
}

render(<App />, document.body);

/*

  const [size, setSize] = useState(256);
  function keyHandler(e: KeyboardEvent) {
    console.log(`keypress: ${e.key}`);
    setSize((size) => size + 1);
  }

  document.body.addEventListener("keydown", keyHandler);

*/

/*

  useEffect(() => {
    document.body.addEventListener("keydown", keyHandler);
    console.log("add keydown listener");
    return () => {
      document.body.removeEventListener("keydown", keyHandler);
      console.log("remove keydown listener");
    };
  }, []);

*/
