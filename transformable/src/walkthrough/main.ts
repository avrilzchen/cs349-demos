import { Transformable } from "./transformable";
// import { Transformable } from "./transformable-demo0";

console.log("transformable");

//#region canvas setup

function createDrawLoop(
  draw: (gc: CanvasRenderingContext2D) => void
) {
  // create canvas
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const gc = canvas.getContext("2d") as CanvasRenderingContext2D;

  // match size to body
  const setSize = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
  };
  document.addEventListener("resize", setSize);
  setSize();

  // create the draw loop
  function loop() {
    draw(gc);
    requestAnimationFrame(loop);
  }
  loop();

  return canvas;
}

//#endregion

// simple resizable shape
const shape = new Transformable(100, 100, 150, 150, 0);

const canvas = createDrawLoop((gc) => {
  gc.fillStyle = "whitesmoke";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

  shape.draw(gc);
});

shape.addListeners(canvas);
