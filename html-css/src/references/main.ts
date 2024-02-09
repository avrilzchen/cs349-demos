import { LeftView } from "./leftView";
import { Model } from "./model";
import { RightView } from "./rightView";

console.log("references");

const model = new Model();

// setup the two views
const leftView = new LeftView(model);
const rightView = new RightView(model);
