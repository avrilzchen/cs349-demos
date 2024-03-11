import { h, render } from "preact";
// import { html } from "htm/preact";

import "./style.css";

// state
let clicked = false;
const setClicked = (value: boolean) => {
  clicked = value;
  update();
};

// create the UI tree for the app
function App() {
  return h("div", { class: "container" }, [
    h("p", null, clicked ? "CLICKED" : "declarative-h"),
    h("button", { onClick: () => setClicked(true) }, "Ok"),
  ]);
}

// when state changes, re-render the app
function update() {
  render(App(), document.querySelector("#app") as Element);
}

// initial render
update();
