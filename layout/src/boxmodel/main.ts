import {
  Settings,
  SKContainer,
  startSimpleKit,
  setSKRoot,
} from "simplekit/imperative-mode";

// global debug flag
// Settings.debug = false;

const root = new SKContainer();
root.id = "root";
root.fill = "white";
// root.debug = false;
root.box.padding = 10;
console.log(`root: ${root.debug}`);

const a = new SKContainer({ x: 30, y: 30, width: 100, height: 100 });
a.box.margin = 20;
a.box.padding = 10;
// a.height = 100;
// c.border = "1px solid black";
a.fill = "lightgrey";
a.debug = true;
a.id = "A";
root.addChild(a);

setSKRoot(root);

startSimpleKit();
