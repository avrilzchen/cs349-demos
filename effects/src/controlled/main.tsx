import { render } from "preact";

import Uncontrolled from "./Uncontrolled";
import Controlled from "./Controlled";
import ControlledConditional from "./ControlledConditional";

import { appState } from "./state";

import "./style.css";

function App() {
  return (
    <div>
      <h2>
        state: '{appState}'
        <button onClick={() => (appState.value = "abc")}>
          Reset
        </button>
      </h2>
      <hr />

      <Uncontrolled />
      {/* <Controlled /> */}
      {/* <ControlledConditional /> */}
    </div>
  );
}

render(<App />, document.querySelector("div#app") as HTMLElement);
