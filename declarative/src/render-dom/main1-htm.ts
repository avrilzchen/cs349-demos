// import { h, render } from "preact";
import { h, render, html } from "./vdom.js";

import "./main1.css";

function ExampleA() {
  return html`<p>Example A</p>`;
}

function ExampleB() {
  return html`<p style="color: red;">Example B</p>`;
}

function ExampleC() {
  return html`<div class="my-div">
    text inside the div
    <p>Example C</p>
  </div>`;
}

function ExampleD() {
  return html`<button onClick=${() => console.log("test")}>
    Ok
  </button>`;
  // return h("button", { onClick: () => (console.log("test")) }, "Ok");
}

// choose example
const Example = ExampleD;

// print VDOM tree
console.log(JSON.stringify(Example(), null, 2));

// render the UI tree
render(Example(), document.querySelector("div#app") as Element);
