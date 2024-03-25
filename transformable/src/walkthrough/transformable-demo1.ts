import {
  drawCross,
  insideHitTestRectangle,
  insideHitTestCircle,
  rotate,
} from "./utility";

export class Transformable {
  constructor(
    public width: number,
    public height: number,
    public x = 0,
    public y = 0,
    public angle = 0
  ) {}

  mode: "idle" | "scale" | "rotate" | "translate" = "idle";

  handleSize = 8;

  addListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousedown", (e) =>
      this.mousedown(e.clientX, e.clientY)
    );
    canvas.addEventListener("mousemove", (e) =>
      this.mousemove(e.clientX, e.clientY)
    );
    canvas.addEventListener("mouseup", (e) =>
      this.mouseup(e.clientX, e.clientY)
    );
  }

  // drag deltas
  delta = { x: 0, y: 0 };
  // where drag started (in shape coordinates)
  dragStart = { x: 0, y: 0 };

  mousedown(mx: number, my: number) {
    // console.log(`mousedown ${[mx, my]}`);

    if (
      insideHitTestCircle(
        mx,
        my,
        this.x + this.width,
        this.y + this.height,
        this.handleSize
      )
    ) {
      this.mode = "scale";
    } else if (
      insideHitTestCircle(
        mx,
        my,
        this.x + this.width / 2,
        this.y - this.handleSize * 3,
        this.handleSize
      )
    ) {
      this.mode = "rotate";
    } else if (
      insideHitTestRectangle(
        mx,
        my,
        this.x,
        this.y,
        this.width,
        this.height
      )
    ) {
      this.mode = "translate";
    }

    // save starting position
    this.dragStart = { x: mx, y: my };
  }

  mousemove(mx: number, my: number) {
    // calculate drag delta (dx, dy)
    const dx = mx - this.dragStart.x;
    const dy = my - this.dragStart.y;

    // console.log(this.mode, dx, dy);

    switch (this.mode) {
      case "scale":
        {
        }
        break;
      case "translate":
        {
          this.delta.x = dx;
          this.delta.y = dy;
        }
        break;
      case "rotate":
        {
        }
        break;
    }
  }

  mouseup(mx: number, my: number) {
    // apply the delta transformations
    switch (this.mode) {
      case "scale":
        break;
      case "translate":
        this.x += this.delta.x;
        this.y += this.delta.y;
        break;
      case "rotate":
        break;
    }
    // clear the delta and mode
    this.delta = { x: 0, y: 0 };
    this.mode = "idle";
  }

  draw(gc: CanvasRenderingContext2D) {
    // apply delta transformations
    const x = this.x + this.delta.x;
    const y = this.y + this.delta.y;
    const width = this.width;
    const height = this.height;
    const angle = this.angle;

    gc.save();
    // set shape position and rotation
    gc.translate(x, y);
    gc.rotate(angle);

    // rectangle
    gc.beginPath();
    gc.rect(0, 0, width, height);
    gc.fillStyle =
      this.mode === "translate" ? "LightSkyBlue" : "LightGrey";
    gc.fill();
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.stroke();

    // scale handle is at lower-right corner
    gc.beginPath();
    gc.arc(width, height, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = this.mode === "scale" ? "LightSkyBlue" : "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // rotate handle is centred at top
    const handleY = 0 - this.handleSize * 3;
    gc.beginPath();
    gc.moveTo(width / 2, 0);
    gc.lineTo(width / 2, handleY);
    gc.strokeStyle = "black";
    gc.stroke();
    gc.beginPath();
    gc.arc(width / 2, handleY, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = this.mode === "rotate" ? "LightSkyBlue" : "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // cross at centre (to make demo clearer)
    gc.strokeStyle =
      this.mode === "rotate" || this.mode === "scale"
        ? "OrangeRed"
        : "white";
    drawCross(gc, width / 2, height / 2);

    gc.restore();
  }
}
