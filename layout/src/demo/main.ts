import {
  startSimpleKit,
  setSKRoot,
  SKButton,
  SKContainer,
  SKLabel,
  SKTextfield,
  Layout,
  Settings,
} from "simplekit/imperative-mode";

// global debug flag to visualize box model dimensions
// Settings.debug = true;

const root = new SKContainer();
root.padding = 10;
root.fill = "whitesmoke";

// fixed size panel in centre
const panel = new SKContainer({ width: 400, height: 150 });
panel.fill = "white";
panel.border = "black";
panel.padding = 20;

root.addChild(panel);
root.layoutMethod = Layout.makeCentredLayout();
// try this too
// root.layoutMethod = Layout.makeFillRowLayout();
// panel.fillWidth = 1;
// panel.margin = 50;

// label
const label = new SKLabel({
  text: "Name:",
  align: "right",
  width: 80,
});

// texfield
const name = new SKTextfield({ width: 150 });
name.fillWidth = 1;

// button
const hello = new SKButton({ text: "Hello", width: 80 });

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

setSKRoot(root);

startSimpleKit();
