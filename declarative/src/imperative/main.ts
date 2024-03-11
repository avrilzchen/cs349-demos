import "./style.css";

// state
let clicked = false;
function setClicked(value: boolean) {
  clicked = value;
  update();
}

// create the UI tree for the app
function App() {
  // create div container
  const container = document.createElement("div");
  container.classList.add("container");

  // create label
  const label = document.createElement("p");
  label.innerText = clicked ? "CLICKED" : "imperative";
  container.appendChild(label);

  // create button
  const button = document.createElement("button");
  button.innerText = "Ok";
  container.appendChild(button);

  // add click handler
  button.addEventListener("click", () => {
    setClicked(true);
  });

  return container;
}

// when state changes, re-render the app
function update() {
  const root = document.querySelector("#app") as Element;
  // render tree into dom
  root.replaceChildren(App());
}

// initial render
update();
