import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
} from "simplekit/canvas-mode";

import {
  animationManager,
  Animator,
  easeIn,
  easeOut,
} from "./animationManager";

// simple Drawable dots
const dot1 = {
  x: 50,
  y: 50,
  r: 20,
  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.beginPath();
    gc.fillStyle = "red";
    gc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    gc.fill();
    gc.restore();
  },
};

// make copies
const dot2 = { ...dot1, y: 100 };
const dot3 = { ...dot1, y: 150 };

// add animations
animationManager.add(
  new Animator(50, 300, 3000, (p) => {
    dot1.x = p;
  })
);

animationManager.add(
  new Animator(
    50,
    350,
    2500,
    (p) => {
      dot2.x = p;
    },
    easeIn
  )
);

animationManager.add(
  new Animator(
    50,
    400,
    3500,
    (p) => {
      dot3.x = p;
    },
    easeOut
  )
);

setSKAnimationCallback((time) => {
  animationManager.update(time);
});

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  dot1.draw(gc);
  dot2.draw(gc);
  dot3.draw(gc);
});

startSimpleKit();
