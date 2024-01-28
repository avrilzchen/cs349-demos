import {
  startSimpleKit,
  setSKRoot,
  SKButton,
  SKTextfield,
  SKContainer,
  SKLabel,
  setSKEventListener,
  SKSlider,
  SKThumb,
} from "simplekit/imperative-mode";

let counter = 0;

// create widgets
const root = new SKContainer({
  x: 10,
  y: 10,
  width: 300,
  height: 300,
});
const increaseButton = new SKButton({
  text: "Increase",
  x: 30,
  y: 30,
  width: 100,
});
const c2 = new SKContainer({ x: 30, y: 70, width: 150, height: 40 });
c2.fill = "lightblue";
c2.box.padding = 10;
const label = new SKLabel({
  text: "By",
  x: 0,
  y: 0,
});
const inc = new SKTextfield({
  text: "1",
  x: 40,
  y: 0,
  width: 100,
});
c2.addChild(label);
c2.addChild(inc);

const total = new SKTextfield({
  text: "0",
  x: 30,
  y: 140,
  width: 100,
});
const clearButton = new SKButton({
  text: "Clear",
  x: 30,
  y: 180,
  width: 100,
});

const slider = new SKSlider({
  x: 140,
  y: 145,
  width: 300,
  height: 20,
  min: -10,
  max: 100,
  value: 0,
});

const thumb = new SKThumb({
  x: 200,
  y: 10,
  width: 20,
  height: 20,
});

// build widget tree
root.addChild(increaseButton);
root.addChild(total);
root.addChild(clearButton);
root.addChild(c2);
root.addChild(slider);

root.addChild(thumb);

// set up event listeners
increaseButton.addEventListener("action", (e) => {
  console.log("incrementButton action!");
  counter = counter += Number.parseInt(inc.text);
  total.text = counter.toString();
  slider.value = counter;
});

clearButton.addEventListener("action", (e) => {
  console.log("clearButton action!");
  counter = 0;
  total.text = counter.toString();
  slider.value = counter;
});

total.addEventListener("textchanged", (e) => {
  const tf = e.source as SKTextfield;
  console.log(`textfield textchanged '${tf.text}'`);
  tf.text = tf.text.replace(/[^0-9]/g, ""); // simple text validation
  counter = parseInt(tf.text) || 0; // convert to number for counter
  slider.value = counter;
});

slider.addEventListener("valuechanged", (e) => {
  const slider = e.source as SKSlider;
  console.log(`slider valuechanged ${slider._value}`);
  counter = Math.round(slider._value);
  total.text = counter.toString();
});

// all SimpleKit needs is the root element
setSKRoot(root);

setSKEventListener((e) => {
  if (["click", "mouseexit", "mouseenter"].includes(e.type)) {
    // console.log(e);
  }
});

startSimpleKit();
