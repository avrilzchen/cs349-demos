import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  setSKRoot,
  SKElement,
  SKButton,
  SKContainer,
} from "simplekit/imperative-mode";";

// this will be the "root" of the UI widget tree
const blueContainer = new SKContainer(50, 20, 200, 175);
blueContainer.fill = "lightblue";

const buttonB = new SKButton("B", 10, 10, 80);
// try moving this to after the greenContainer is added
blueContainer.addChild(buttonB);

const greenContainer = new SKContainer(20, 60, 150, 75);
greenContainer.fill = "lightgreen";

const buttonA = new SKButton("A", 10, 10, 80);
greenContainer.addChild(buttonA);

blueContainer.addChild(greenContainer);

// try adding a third button and look at the console output
// blueContainer.addChild(new SKButton("C", 100, 10, 80));

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  blueContainer.draw(gc); // draw from root
});

setSKEventListener((e) => {
  if (e.type == "click") {
    const { x, y } = e as SKMouseEvent;
    // get list of elements under mouse (from back to front)
    const route = buildTargetRoute(x, y, blueContainer);
    console.log(
      "route: ",
      route.map((el) => el.toString()).join(" -> ")
    );
  }
});

startSimpleKit();

// returns route from root to all elements under mouse
// (from back to front)
function buildTargetRoute(
  mx: number,
  my: number,
  element: SKElement
): SKElement[] {
  const route: SKElement[] = [];
  if (element instanceof SKContainer) {
    (element as SKContainer).children.forEach((child) =>
      route.push(
        ...buildTargetRoute(
          mx - element.x, // translate to child coord system
          my - element.y,
          child
        )
      )
    );
  }
  console.log(`? ${element.toString()}`);
  if (element.hittest(mx, my)) {
    return [element, ...route];
  } else {
    return route;
  }
}
