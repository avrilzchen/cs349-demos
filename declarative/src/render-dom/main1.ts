// import { h, render } from "preact";
import { h, render } from "./vdom.js";

import "./main1.css";

function ExampleA() {
  return h("p", {}, "Example A");
}

function ExampleB() {
  return h("p", { style: "color: red;" }, "Example B");
}

function ExampleC() {
  // prettier-ignore
  return h("div", { class: "my-div" }, [
    "text inside the div",
    h("p", {}, "Example C"),
  ]);
}

function ExampleD() {
  // prettier-ignore
  return h("button", { onClick: () => (console.log("test")) }, "Ok");
}

// choose example
const Example = ExampleD;

// print VDOM tree
console.log(JSON.stringify(Example(), null, 2));

// render the UI tree
render(Example(), document.querySelector("div#app") as Element);
