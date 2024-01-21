import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
} from "simplekit/canvas-mode";

import { KeyFrame, KeyFramer } from "./keyframer";

// simple "Drawable" object
const dot = {
  x: 0,
  y: 75,
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

// set animation callback
setSKAnimationCallback((time) => {
  animateDotX.update(time);
});

// set draw callback
setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  dot.draw(gc);
});

startSimpleKit();

// define keyframes
const keyframes: KeyFrame[] = [
  { time: 0, targetValue: 50 },
  { time: 1000, targetValue: 450 },
  { time: 3000, targetValue: 450 },
  { time: 5000, targetValue: 50 },
  { time: 6000, targetValue: 150 },
];

// create keyframer for animation
const animateDotX = new KeyFramer(keyframes, (value) => {
  dot.x = value;
});
