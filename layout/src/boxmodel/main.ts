import {
  Settings,
  SKContainer,
  startSimpleKit,
  setSKRoot,
} from "simplekit/imperative-mode";

// global debug flag
// Settings.debug = false;

const root = new SKContainer();
root.id = "ROOT";
root.fill = "white";
// root.debug = true;
root.box.padding = 10;
console.log(`root: ${root.debug}`);

const a = new SKContainer({ x: 30, y: 30, width: 125, height: 75 });
a.box.margin = 20;
a.box.padding = 10;
// a.height = 100;
// c.border = "1px solid black";
a.fill = "lightgrey";
// for debug only
a.debug = true;
a.id = "A";
root.addChild(a);

setSKRoot(root);

startSimpleKit();
