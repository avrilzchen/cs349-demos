console.log("drag-dom");

// get reference to app div
const app = document.querySelector("div#app") as HTMLDivElement;

// array of "div" circles to draw
const circles: HTMLDivElement[] = [];

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// create circles
for (let i = 0; i < 5; i++) {
  const div = document.createElement("div");
  div.classList.add("circle");
  const diameter = random(32, 128);
  div.style.width = `${diameter}px`;
  div.style.height = `${diameter}px`;
  div.style.left = `${random(
    app.offsetLeft,
    app.offsetLeft + app.offsetWidth - diameter
  )}px`;
  div.style.top = `${random(
    app.offsetTop,
    app.offsetTop + app.offsetHeight - diameter
  )}px`;

  circles.push(div);
}

// function to add dragging functionality to a circle
function makeDraggable(circle: HTMLDivElement, parent: HTMLElement) {
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  circle.addEventListener("mousedown", (e) => {
    console.log("hit");
    isDragging = true;
    // need offset to prevent jump to centre
    // (try removing these lines to see what happens)
    const x = Number.parseInt(circle.style.left);
    const y = Number.parseInt(circle.style.top);
    dragOffsetX = x - e.x;
    dragOffsetY = y - e.y;
  });

  parent.addEventListener("mousemove", (e) => {
    if (isDragging) {
      console.log("dragging");
      circle.style.left = `${e.x + dragOffsetX}px`;
      circle.style.top = `${e.y + dragOffsetY}px`;
    }
  });

  parent.addEventListener("mouseup", (e) => {
    isDragging = false;
  });
}

// make all circles draggable
circles.forEach((circle) => makeDraggable(circle, app));

// add all circles to the DOM
circles.forEach((circle) => app.appendChild(circle));
