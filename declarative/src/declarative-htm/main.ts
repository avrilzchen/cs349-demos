import { render } from "preact";
import { html } from "htm/preact";

import "./style.css";

// state
let clicked = false;
const setClicked = (value: boolean) => {
  clicked = value;
  update();
};

// create the UI tree for the app
function App() {
  return html`
    <div class="container">
      <p>${clicked ? "CLICKED" : "declarative-htm"}</p>
      <button onClick=${() => setClicked(true)}>Ok</button>
    </div>
  `;
}

// when state changes, re-render the app
function update() {
  render(html`<${App} />`, document.querySelector("#app") as Element);
}

// initial render
update();
