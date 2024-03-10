import { h, render } from "preact";

import "./style.css";

// state
let clicked = false;
const setClicked = (value: boolean) => {
  clicked = value;
  update();
};

function App() {
  return (
    <div class="container">
      <p>{clicked ? "CLICKED" : "declarative-jsx"}</p>
      <button onClick={() => setClicked(true)}>Ok</button>
    </div>
  );
}


// when state changes, re-render the app
function update() {
  render(<App />, document.querySelector("#app") as Element);
}

// initial render
update();
