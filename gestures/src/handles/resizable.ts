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
    gc.translate(-width / 2, -height / 2);

    gc.beginPath();
    gc.rect(0, 0, width, height);
    gc.fillStyle = "lightgrey";
    gc.fill();
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.stroke();

    // scale handle
    gc.beginPath();
    gc.arc(width, height, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // rotate handle
    const handleX = width / 2;
    const handleY = this.handleSize * 3;
    gc.beginPath();
    gc.moveTo(handleX, 0);
    gc.lineTo(handleX, -handleY);
    gc.strokeStyle = "black";
    gc.stroke();

    gc.beginPath();
    gc.arc(handleX, -handleY, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // for debugging
    gc.beginPath();
    gc.arc(width / 2, height / 2, 3, 0, 2 * Math.PI);
    gc.fillStyle = "red";
    gc.fill();

    gc.restore();
  }
}
