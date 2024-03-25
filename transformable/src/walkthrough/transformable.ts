import {
  drawCross,
  insideHitTestRectangle,
  insideHitTestCircle,
  rotate,
} from "./utility";

// rotatable, scalable, and translatable shape
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

  transformMouseToShapeCoordinates(_mx: number, _my: number) {
    // transform mouse to shape coordinates
    // (_mx, _my) is mouse in world coordinates
    // (mx, my) is mouse in shape coordinates
    let mx = _mx - this.x;
    let my = _my - this.y;
    [mx, my] = rotate(mx, my, -this.angle, 0, 0);

    return { mx, my };
  }

  // drag deltas
  delta = { x: 0, y: 0, width: 0, height: 0, angle: 0 };
  // where drag started (in shape coordinates)
  dragStart = { x: 0, y: 0 };

  mousedown(_mx: number, _my: number) {
    // transform mouse position to shape coordinates
    const { mx, my } = this.transformMouseToShapeCoordinates(
      _mx,
      _my
    );

    if (
      insideHitTestCircle(
        mx,
        my,
        this.width / 2,
        this.height / 2,
        this.handleSize
      )
    ) {
      this.mode = "scale";
    } else if (
      insideHitTestCircle(
        mx,
        my,
        0,
        -this.height / 2 - this.handleSize * 3,
        this.handleSize
      )
    ) {
      this.mode = "rotate";
    } else if (
      insideHitTestRectangle(
        mx,
        my,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
    ) {
      this.mode = "translate";
    }

    // save starting position
    this.dragStart = { x: mx, y: my };
  }

  mousemove(_mx: number, _my: number) {
    // transform mouse position to shape coordinates
    const { mx, my } = this.transformMouseToShapeCoordinates(
      _mx,
      _my
    );

    // calculate drag delta (dx, dy)
    const dx = mx - this.dragStart.x;
    const dy = my - this.dragStart.y;

    switch (this.mode) {
      case "scale":
        {
          // use drag delta for width and height
          // (could constrain min size here too, e.g. max(dx, -this.width))
          this.delta.width = dx;
          this.delta.height = dy;
          // adjust the shape centre to keep opposite corner fixed
          const [dwRotated, dhRotated] = rotate(
            this.delta.width,
            this.delta.height,
            this.angle
          );
          // move the shape centre by half the size delta
          this.delta.x = dwRotated / 2;
          this.delta.y = dhRotated / 2;
        }
        break;
      case "translate":
        {
          const [dxRotated, dyRotated] = rotate(dx, dy, this.angle);
          this.delta.x = dxRotated;
          this.delta.y = dyRotated;
        }
        break;
      case "rotate":
        {
          const handlePoint = { x: 0, y: -this.height / 2 };
          const mouseAngle = Math.atan2(my, mx);
          const handleAngle = Math.atan2(
            handlePoint.y,
            handlePoint.x
          );
          this.delta.angle = mouseAngle - handleAngle;
        }
        break;
    }
  }

  mouseup(mx: number, my: number) {
    // apply the delta transformations
    switch (this.mode) {
      case "scale":
        this.width += this.delta.width;
        this.height += this.delta.height;
        this.x += this.delta.x;
        this.y += this.delta.y;
        break;
      case "translate":
        this.x += this.delta.x;
        this.y += this.delta.y;
        break;
      case "rotate":
        this.angle += this.delta.angle;
        break;
    }
    // clear the delta and mode
    this.delta = { x: 0, y: 0, width: 0, height: 0, angle: 0 };
    this.mode = "idle";
  }

  draw(gc: CanvasRenderingContext2D) {
    // apply delta transformations
    const x = this.x + this.delta.x;
    const y = this.y + this.delta.y;
    const width = this.width + this.delta.width;
    const height = this.height + this.delta.height;
    const angle = this.angle + this.delta.angle;

    gc.save();
    // set shape position and rotation
    gc.translate(x, y);
    gc.rotate(angle);

    // draw everything in base shape coordinate frame

    // rectangle centred at 0,0
    gc.beginPath();
    gc.rect(-width / 2, -height / 2, width, height);
    gc.fillStyle =
      this.mode === "translate" ? "LightSkyBlue" : "LightGrey";
    gc.fill();
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.stroke();

    // scale handle is at lower-right corner
    gc.beginPath();
    gc.arc(width / 2, height / 2, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = this.mode === "scale" ? "LightSkyBlue" : "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // rotate handle is centred at top
    const handleY = -height / 2 - this.handleSize * 3;
    gc.beginPath();
    gc.moveTo(0, -height / 2);
    gc.lineTo(0, handleY);
    gc.strokeStyle = "black";
    gc.stroke();
    gc.beginPath();
    gc.arc(0, handleY, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = this.mode === "rotate" ? "LightSkyBlue" : "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // cross at centre (to make demo clearer)
    gc.strokeStyle =
      this.mode === "rotate" || this.mode === "scale"
        ? "OrangeRed"
        : "white";
    drawCross(gc, 0, 0);

    gc.restore();
  }
}
