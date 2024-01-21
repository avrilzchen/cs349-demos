export {}; // force module

import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
} from "simplekit/canvas-mode";

import { Animator } from "./animator";

const dot = {
  x: 0,
  y: 0,
  r: 32,
  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.beginPath();
    gc.fillStyle = "red";
    gc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    gc.fill();
    gc.restore();
  },
};

// animation callback
setSKAnimationCallback((time) => {
  animateDotX.update(time);
});

// draw callback
setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

  dot.draw(gc);
});

dot.y = 75;

// setup the animation object
const animateDotX = new Animator(50, 300, 3000, (value) => {
  dot.x = value;
});

// could also use skTime instead of 0
animateDotX.start(0);

startSimpleKit();
