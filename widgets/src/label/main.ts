import {
  startSimpleKit,
  setSKDrawCallback,
} from "simplekit/imperative-mode";

import { SKLabel } from "./label.ts";

// create a test label
const label = new SKLabel("Test Label", 50, 50);
// can change other properties
// label.width = 200;
// label.align = "right";
// label.font = "25px sans-serif";

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  label.draw(gc);
});

startSimpleKit();
