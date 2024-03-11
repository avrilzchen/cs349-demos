import html from "html-template-tag";

import "./style.css";

// state
let clicked = false;
const setClicked = (value: boolean) => {
  clicked = value;
  // state changed, so update the UI
  update();
};

// create the UI tree for the app
function renderApp(root: Element) {
  root.innerHTML = html`
    <div class="container">
      <p>${clicked ? "CLICKED" : "declarative-string"}</p>
      <button>Ok</button>
    </div>
  `;
  document.querySelector("button")?.addEventListener("click", () => {
    setClicked(true);
  });
}

// when state changes, re-render the app
function update() {
  const root = document.querySelector("#app") as Element;
  renderApp(root);
}

// initial render
update();
