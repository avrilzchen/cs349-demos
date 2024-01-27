console.log("dispatch/src/propagation/main.ts");

import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  SKElement,
  SKContainer,
} from "simplekit/imperative-mode";

// this will be the "root" of the UI widget tree
const redContainer = new SKContainer({
  x: 20,
  y: 20,
  width: 140,
  height: 140,
});
redContainer.fill = "red";

const orangeContainer = new SKContainer({
  x: 20,
  y: 20,
  width: 100,
  height: 100,
});
orangeContainer.fill = "orange";

const yellowContainer = new SKContainer({
  x: 20,
  y: 20,
  width: 60,
  height: 60,
});
yellowContainer.fill = "yellow";

yellowContainer.addEventListener("action", (e) => {
  console.log("yellow action on bubble");
  return true; // return true to stop propagation
});

redContainer.addEventListener(
  "action",
  (e) => {
    console.log("red action on capture");
    return true; // return true to stop propagation
  },
  true // sets event type to capture
);

redContainer.addChild(orangeContainer);
orangeContainer.addChild(yellowContainer);

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  redContainer.draw(gc); // draw from root
});

setSKEventListener((e) => {
  if (e.type == "click") {
    dispatch(e as SKMouseEvent, redContainer);
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
  // console.log(`? ${element.toString()}`);
  if (element.hitTest(mx, my)) {
    return [element, ...route];
  } else {
    return route;
  }
}

function dispatch(me: SKMouseEvent, root: SKElement) {
  let route = buildTargetRoute(me.x, me.y, root);

  // capture
  const stopPropagation = !route.every((element) => {
    const handled = element.handleMouseEventCapture(me);
    console.log(`capture ${element.toString()}, handled: ${handled}`);
    return !handled;
  });

  console.log(`stop propagation? ${stopPropagation}`);
  if (stopPropagation) return;

  // bubble
  route.reverse().every((element) => {
    const handled = element.handleMouseEvent(me);
    console.log(`bubble ${element.toString()}, handled: ${handled}`);
    return !handled;
  });
}
