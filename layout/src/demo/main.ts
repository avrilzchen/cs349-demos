import { startSimpleKit, setSKRoot } from "../../../simplekit";
import {
  SKButton,
  SKContainer,
  SKLabel,
  SKTextfield,
} from "../../../simplekit/widget";

import * as Layout from "../../../simplekit/layout";

const root = new SKContainer();
root.box.padding = 10;
root.fill = "whitesmoke";
// root.debug = true;

setSKRoot(root);

// fixed size panel in centre
const panel = new SKContainer();
panel.fill = "white";
panel.border = "black";
panel.box.padding = 20;
panel.width = 400;
panel.height = 150;

root.addChild(panel);
root.layoutMethod = Layout.makeCentredLayout();
// try this too
// root.layoutMethod = Layout.makeFillRowLayout();
// panel.fillWidth = 1;
// panel.box.margin = 50;

// label
const label = new SKLabel("Name:");
label.align = "right";

// texfield
const name = new SKTextfield();
name.width = 100;
name.fillWidth = 1;

// button
const hello = new SKButton("Hello");

// set an event handler for button "action" event
hello.addEventListener("action", () => {
  const msg =
    name.text == "" ? "Anyone there?" : `Hello ${name.text}`;
  console.log(msg);
});

// add them to panel
panel.addChild(label);
panel.addChild(name);
panel.addChild(hello);

panel.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

startSimpleKit();
