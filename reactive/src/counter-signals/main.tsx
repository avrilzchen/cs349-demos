import { render } from "preact";

import LeftView from "./Left";
import RightView from "./Right";

import "./style.css";

console.log("counter-signals");

export default function App() {
  return (
    <>
      <LeftView />
      <RightView colour="lightblue" />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
