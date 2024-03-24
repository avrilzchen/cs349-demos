import { ResizableShape } from "./resizable";

console.log("handles");

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const gc = canvas.getContext("2d") as CanvasRenderingContext2D;

const shape = new ResizableShape(100, 100, 100, 100);

let m = { x: 0, y: 0 };
let c = { x: 100, y: 100 };
let p = { x: 100, y: 50 };

canvas.addEventListener("mousedown", (e) =>
  shape.mousedown(e.clientX, e.clientY)
);

canvas.addEventListener("mousemove", (e) => {
  shape.mousemove(e.clientX, e.clientY);
  m = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("mouseup", (e) =>
  shape.mouseup(e.clientX, e.clientY)
);

function draw(gc: CanvasRenderingContext2D) {
  gc.fillStyle = "whitesmoke";
  gc.fillRect(0, 0, canvas.width, canvas.height);

  //   gc.translate(100, 100);
  shape.draw(gc);

  //   gc.beginPath();
  //   gc.moveTo(c.x, c.y);
  //   gc.lineTo(p.x, p.y);
  //   gc.strokeStyle = "red";
  //   gc.stroke();
  //   gc.beginPath();
  //   gc.moveTo(c.x, c.y);
  //   gc.lineTo(m.x, m.y);
  //   gc.strokeStyle = "blue";
  //   gc.stroke();

  //   const a = (Math.atan2(p.y - c.y, p.x - c.x) * 180) / Math.PI;
  //   const b = (Math.atan2(m.y - c.y, m.x - c.x) * 180) / Math.PI;
  //   console.log(a, b, a - b);

  requestAnimationFrame(() => draw(gc));
}

requestAnimationFrame(() => draw(gc));
