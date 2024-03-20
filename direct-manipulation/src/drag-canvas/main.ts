import { Circle } from "./circle";

import "./style.css";

console.log("drag-canvas");

// create canvas element and append to DOM
const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 400;
document.querySelector("div#app")?.appendChild(canvas);

// create array of circles to draw
const circles: Circle[] = [];

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

for (let i = 0; i < 5; i++) {
  circles.push(
    new Circle(
      random(0, canvas.width),
      random(0, canvas.height),
      random(32, 128)
    )
  );
}

// function to add dragging functionality to a circle
function makeDraggable(circle: Circle, canvas: HTMLCanvasElement) {
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  canvas.addEventListener("mousedown", (e) => {
    if (circle.hitTest(e.offsetX, e.offsetY)) {
      isDragging = true;
      // need offset to prevent jump to centre
      // (try removing these lines to see what happens)
      dragOffsetX = circle.x - e.offsetX;
      dragOffsetY = circle.y - e.offsetY;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      circle.x = e.offsetX + dragOffsetX;
      circle.y = e.offsetY + dragOffsetY;
    }
  });

  canvas.addEventListener("mouseup", (_) => {
    isDragging = false;
  });
}

// make all circles draggable
circles.forEach((circle) => makeDraggable(circle, canvas));

function draw(gc: CanvasRenderingContext2D) {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.fillStyle = "red";
  circles.forEach((circle) => circle.draw(gc));
  // continue draw loop
  requestAnimationFrame(() => draw(gc));
}

// start the draw loop
draw(canvas.getContext("2d") as CanvasRenderingContext2D);
