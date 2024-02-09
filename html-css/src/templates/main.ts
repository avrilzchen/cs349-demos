import { LeftView } from "./leftView";
import { Model } from "./model";
import { RightView } from "./rightView";

console.log("references");

const model = new Model();

// get reference to panel
const panel = document.getElementById("panel") as HTMLElement;
if (!panel) throw new Error("panel not found");

// clear the panel of any content
panel.innerHTML = "";

// setup the two views
const leftView = new LeftView(panel, model);
const rightView = new RightView(panel, model);
