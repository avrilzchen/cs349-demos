import {
  startSimpleKit,
  setSKRoot,
  SKButton,
  SKTextfield,
  SKContainer,
} from "simplekit/imperative-mode";

let counter = 0;

const root = new SKContainer(10, 10, 300, 300);
const increaseButton = new SKButton("Increase", 30, 30, 100);
const textfield = new SKTextfield("0", 30, 80, 100);
const clearButton = new SKButton("Clear", 30, 150, 100);

// build widget tree
root.addChild(increaseButton);
root.addChild(textfield);
root.addChild(clearButton);

// set up event listeners
increaseButton.addEventListener("action", (e) => {
  console.log("incrementButton action!");
  counter++;
  textfield.text = counter.toString();
});

clearButton.addEventListener("action", (e) => {
  console.log("clearButton action!");
  counter = 0;
  textfield.text = counter.toString();
});

textfield.addEventListener("textchanged", (e) => {
  const tf = e.source as SKTextfield;
  console.log(`textfield textchanged '${tf.text}'`);
  tf.text = tf.text.replace(/[^0-9]/g, ""); // simple text validation
  counter = parseInt(tf.text) || 0; // convert to number for counter
});

// all SimpleKit needs is the root element
setSKRoot(root);

startSimpleKit();
