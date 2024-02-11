import { Model } from "./model";
import { LeftView } from "./leftView";
import { RightView } from "./rightView";

import "./main.css";

console.log("imperative");

const model = new Model();

// set root to app div
const root = document.querySelector("div#app") as HTMLDivElement;

// create panel div to hold the two views
const panel = document.createElement("div");
panel.id = "main";

// create the two views
panel.appendChild(new LeftView(model).root);
panel.appendChild(new RightView(model).root);

root.appendChild(panel);
