import {
  startSimpleKit,
  setSKDrawCallback,
  SKButton,
  SKContainer,
} from "simplekit/imperative-mode";

const blueContainer = new SKContainer(50, 20, 200, 175);
blueContainer.fill = "lightblue";

const buttonB = new SKButton("B", 10, 10, 80);
blueContainer.addChild(buttonB);

const greenContainer = new SKContainer(20, 80, 150, 75);
greenContainer.fill = "lightgreen";

const buttonA = new SKButton("A", 10, 10, 80);
greenContainer.addChild(buttonA);

// try adding the green container to the blue container
// blueContainer.addChild(greenContainer);

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  blueContainer.draw(gc);
  greenContainer.draw(gc);
});

startSimpleKit();
