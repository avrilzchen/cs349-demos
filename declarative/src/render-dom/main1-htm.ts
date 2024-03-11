/**
 * switch between implementations of
 * HTM, hyperscript, and render function
 * (vdom.js has simplified implementations for this demo)
 */
import { render } from "preact";
import { html } from "htm/preact";
// import { render, html } from "./vdom.js";

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
  // prettier-ignore
  return html`<button onClick=${() => console.log("🔥 CLICKED!")}>Ok</button>`;
}

/*
 * Choose example here
 */
const Example = ExampleA;

// print VDOM tree
console.log(JSON.stringify(Example(), null, 2));

// render the UI tree
render(Example(), document.querySelector("div#app") as Element);
