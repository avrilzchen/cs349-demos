import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  SKKeyboardEvent,
} from "simplekit/imperative-mode";

import { SKTextfield } from "./textfield.ts";

// create a test label
const textfield = new SKTextfield("Hello Textfield", 50, 50, 150);

setSKEventListener((e) => {
  switch (e.type) {
    case "mousemove":
      {
        // testing mouseexit/mouseenter behaviour
        const { x, y } = e as SKMouseEvent;
        if (textfield.hittest(x, y)) {
          textfield.state = "hover";
        } else {
          textfield.state = "idle";
        }
      }
      break;
    case "click":
      {
        // test getting and losing keyboard focus
        const { x, y } = e as SKMouseEvent;
        if (textfield.hittest(x, y)) {
          textfield.focus = true;
        } else {
          textfield.focus = false;
        }
      }
      break;

    case "keypress":
      const { key } = e as SKKeyboardEvent;
      // test editing text
      if (textfield.focus && key) {
        textfield.text = textfield.applyEdit(textfield.text, key);
      }
      break;
  }
});

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  textfield.draw(gc);
});

startSimpleKit();
