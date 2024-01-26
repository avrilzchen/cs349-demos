import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
} from "simplekit/imperative-mode";

import { SKButton } from "./button.ts";

// create a test button
const button = new SKButton("Test", 50, 50, 120);

setSKEventListener((e) => {
  // test button behaviour
  switch (e.type) {
    case "mousemove":
      {
        if (button.state !== "down") {
          const { x, y } = e as SKMouseEvent;
          if (button.hittest(x, y)) {
            button.state = "hover";
          } else {
            button.state = "idle";
          }
        }
      }
      break;

    case "mousedown":
      {
        const { x, y } = e as SKMouseEvent;
        if (button.hittest(x, y)) {
          button.state = "down";
        }
      }
      break;

    case "mouseup":
      {
        if (button.state === "down") {
          console.log("button click action");
          button.state = "idle";
        }
      }
      break;
  }
});

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  button.draw(gc);
});

startSimpleKit();
