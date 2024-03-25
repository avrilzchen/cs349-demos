function insideHitTestCircle(
  mx: number,
  my: number,
  x: number,
  y: number,
  r: number
) {
  return (mx - x) ** 2 + (my - y) ** 2 <= r ** 2;
}

function rotate(x: number, y: number, angle: number, cx = 0, cy = 0) {
  angle = (angle * Math.PI) / 180;
  return [
    (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
    (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy,
  ];
}

export class ResizableShape {
  constructor(
    public width: number,
    public height: number,
    public x = 0,
    public y = 0,
    public angle = 0
  ) {}

  mode: "none" | "scale" | "rotate" | "translate" = "none";

  handleSize = 8;

  deltaX = 0;
  deltaY = 0;
  deltaWidth = 0;
  deltaHeight = 0;
  deltaAngle = 0;

  offset = { x: 0, y: 0 };
  start = { x: 0, y: 0 };

  transformMouseToShapeCoordinates(mx: number, my: number) {
    [mx, my] = rotate(mx, my, -this.angle, this.x, this.y);

    mx -= this.x; // + this.width / 2;
    my -= this.y; // + this.height / 2;

    return { mx, my };
  }

  mousedown(_mx: number, _my: number) {
    // transform mouse to shape coordinates
    const { mx, my } = this.transformMouseToShapeCoordinates(
      _mx,
      _my
    );

    let hit = false;
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
      hit = true;
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
      hit = true;
    } else if (
      mx >= -this.width / 2 &&
      mx <= this.width / 2 &&
      my >= -this.height / 2 &&
      my <= this.height / 2
    ) {
      this.mode = "translate";
      hit = true;
    }

    if (hit) {
      this.offset = { x: mx - this.width, y: my - this.height };
      this.start = { x: this.width, y: this.height };
    }

    console.log(
      `mousedown: "${this.mode}" _m (${_mx}, ${_my}) m (${mx}, ${my}) `
    );
  }

  mousemove(_mx: number, _my: number) {
    // transform mouse to shape coordinates
    const { mx, my } = this.transformMouseToShapeCoordinates(
      _mx,
      _my
    );

    const dx = mx - this.start.x - this.offset.x;
    const dy = my - this.start.y - this.offset.y;

    if (this.mode !== "none") {
      console.log(
        `mousemove: ${this.mode} _m (${_mx}, ${_my}) m (${mx}, ${my}) dx: ${dx}, dy: ${dy} (${this.deltaX}, ${this.deltaY}) (${this.deltaWidth}, ${this.deltaHeight}) (${this.deltaAngle}`
      );
    }

    switch (this.mode) {
      case "scale":
        this.deltaWidth = dx;
        this.deltaHeight = dy;
        {
          const [ddx, ddy] = rotate(dx, dy, this.angle, 0, 0);
          this.deltaX = ddx / 2;
          this.deltaY = ddy / 2;
        }
        console.log(`scale: ${dy}, ${dy}`);
        // this.start = { x: mx - this.offset.x, y: my - this.offset.y };
        break;
      case "translate":
        // const [ddx, ddy] = this.transformMouseToShapeCoordinates(dx, dy);
        const [ddx, ddy] = rotate(dx, dy, this.angle, 0, 0);
        this.deltaX = ddx;
        this.deltaY = ddy; //_my - this.start.y - this.offset.y;
        break;
      case "rotate":
        const up = { x: 0, y: -this.height / 2 };

        const a = (Math.atan2(my, mx) * 180) / Math.PI;
        const b = (Math.atan2(up.y, up.x) * 180) / Math.PI;
        const da = a - b;
        console.log(
          `🔥 rotate: mouse (${[mx, my]}) up (${[
            up.x,
            up.y,
          ]}) ${a}°, ${b}° ==> ${da}°`
        );
        this.deltaAngle = da;
        // this.start = { x: mx - this.offset.x, y: my - this.offset.y };
        // console.log(`rotate: ${dy}, ${dy} => ${this.angle}`);
        break;
    }
  }

  mouseup(mx: number, my: number) {
    switch (this.mode) {
      case "scale":
        this.width += this.deltaWidth;
        this.height += this.deltaHeight;
        this.x += this.deltaX;
        this.y += this.deltaY;
        break;
      case "translate":
        this.x += this.deltaX;
        this.y += this.deltaY;
        break;
      case "rotate":
        this.angle += this.deltaAngle;
        break;
    }

    this.mode = "none";

    this.deltaX = 0;
    this.deltaY = 0;
    this.deltaWidth = 0;
    this.deltaHeight = 0;
    this.deltaAngle = 0;
  }

  draw(gc: CanvasRenderingContext2D) {
    const x = this.x + this.deltaX;
    const y = this.y + this.deltaY;
    const width = this.width + this.deltaWidth;
    const height = this.height + this.deltaHeight;
    const angle = this.angle + this.deltaAngle;

    gc.save();
    gc.translate(x, y);

    gc.rotate((angle * Math.PI) / 180);

    // gc.translate(-width / 2, -height / 2);

    gc.beginPath();
    gc.rect(-width / 2, -height / 2, width, height);
    gc.fillStyle =
      this.mode === "translate" ? "LightSkyBlue" : "LightGrey";
    gc.fill();
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.stroke();

    // scale handle
    gc.beginPath();
    gc.arc(width / 2, height / 2, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = this.mode === "scale" ? "LightSkyBlue" : "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // rotate handle
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

    // draw centre to make demo easier to understand
    gc.strokeStyle =
      this.mode === "rotate" || this.mode === "scale"
        ? "OrangeRed"
        : "white";
    drawCross(gc, 0, 0);

    gc.restore();
  }
}

function drawCross(
  gc: CanvasRenderingContext2D,
  x: number,
  y: number,
  size = 5
) {
  gc.beginPath();
  gc.moveTo(x - size, y);
  gc.lineTo(x + size, y);
  gc.moveTo(x, y - size);
  gc.lineTo(x, y + size);
  gc.lineWidth = 1;
  gc.stroke();
}
