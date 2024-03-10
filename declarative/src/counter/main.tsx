import { h, render } from "preact";

import "./style.css";

// the two "view" components
import LeftView from "./Left";
import RightView from "./Right";

console.log("counter");

// state
let count = 0;
const setCount = (value: number) => {
  count = value;
  update();
};

// create the UI tree for the app
function App() {

  return (
    <>
      <LeftView count={count} handleClick={() => setCount(count + 1)} />
      <RightView count={count} />
    </>
  );
}

// when state changes, re-render the app
function update() {
  render(<App />, document.querySelector("#app") as Element);
}

// initial render
update();
