import { startSimpleKit, setSKDrawCallback } from "simplekit/canvas";

startSimpleKit();

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

  // demos
  squareDemo(gc);
  // paintersDemo(gc);
  // displayListDemo(gc);
});

//#region squareDemo
import { Square } from "./square";

const redSquare = new Square(50, 50, 50);
const blueSquare = new Square(250, 50, 50);
const square = new Square(150, 50, 50);

function squareDemo(gc: CanvasRenderingContext2D) {
  gc.save();
  gc.fillStyle = "pink";
  gc.strokeStyle = "red";
  gc.lineWidth = 3;
  redSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "lightblue";
  gc.strokeStyle = "blue";
  gc.lineWidth = 3;
  blueSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "grey";
  square.draw(gc);
  gc.restore();
}
//#endregion

//#region paintersDemo
import { Button } from "./button";
import { Cat } from "./cat";

const okButton = new Button(20, 10, 100, 32, "Ok");
const cancelButton = new Button(140, 10, 100, 32, "Cancel");
cancelButton.isHighlighted = true;
const cat = new Cat(50, 100);

function paintersDemo(gc: CanvasRenderingContext2D) {
  okButton.draw(gc);
  cancelButton.draw(gc);
  cat.draw(gc);
}
//#endregion

//#region displayListDemo

import { DisplayList } from "./displaylist";

const displayList = new DisplayList();

const cat2 = new Cat(60, 80);

displayList.add(cat2);
displayList.add(new Button(5, 5, 50, 50, "A"));
displayList.add(new Button(55, 5, 50, 50, "B"));

//#region random objects
if (true) {
  // useful for generating random numbers
  function random(lower: number, upper: number) {
    return lower + Math.random() * (upper - lower);
  }

  for (let i = 0; i < 10; i++) {
    const w = random(25, 50);
    const x = random(0, 150 - w);
    const y = random(0, 150 - w);
    const button = new Button(x, y, w, w, `${i}`);
    displayList.add(button);
  }
}
//#endregion

// move shape to front
// displayList.remove(cat2);
// displayList.add(cat2);

function displayListDemo(gc: CanvasRenderingContext2D) {
  displayList.draw(gc);
}

//#endregion
