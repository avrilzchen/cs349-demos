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

  offset = { x: 0, y: 0 };
  start = { x: 0, y: 0 };

  transformMouseToShapeCoordinates(mx: number, my: number) {
    [mx, my] = rotate(mx, my, -this.angle, this.x, this.y);

    mx -= this.x - this.width / 2;
    my -= this.y - this.height / 2;

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
        this.width,
        this.height,
        this.handleSize
      )
    ) {
      this.mode = "scale";
      hit = true;
    } else if (
      insideHitTestCircle(
        mx,
        my,
        this.width / 2,
        -this.handleSize * 3,
        this.handleSize
      )
    ) {
      this.mode = "rotate";
      hit = true;
    } else if (
      mx >= 0 &&
      mx <= this.width &&
      my >= 0 &&
      my <= this.height
    ) {
      this.mode = "translate";
      hit = true;
    }

    if (hit) {
      this.offset = { x: mx - this.width, y: my - this.height };
      this.start = { x: this.width, y: this.height };

      console.log(`mousedown: ${this.mode} (${mx}, ${my}) `);
    }
  }

  mousemove(_mx: number, _my: number) {
    // transform mouse to shape coordinates
    const { mx, my } = this.transformMouseToShapeCoordinates(
      _mx,
      _my
    );

    const dx = mx - this.start.x - this.offset.x;
    const dy = my - this.start.y - this.offset.y;

    switch (this.mode) {
      case "scale":
        this.width += dx;
        this.height += dy;
        console.log(`scale: ${dy}, ${dy}`);
        this.start = { x: mx - this.offset.x, y: my - this.offset.y };
        break;
      case "rotate":
        const a = (Math.atan2(dy, dx) * 180) / Math.PI;
        const b =
          (Math.atan2(this.start.y, this.start.x) * 180) / Math.PI;
        const da = a - b;
        console.log(`❤️ rotate: ${a}, ${b} ==> ${da}`);
        this.angle += da;
        this.start = { x: mx - this.offset.x, y: my - this.offset.y };
        // console.log(`rotate: ${dy}, ${dy} => ${this.angle}`);
        break;
      case "translate":
        this.x += dx;
        this.y += dy;
        break;
    }

    if (this.mode !== "none") {
      //   console.log(
      //     `mousemove: ${this.mode} (${mx}, ${my}) new (${this.x}, ${this.y})`
      //   );
    }
  }

  mouseup(mx: number, my: number) {
    this.mode = "none";
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.translate(this.x, this.y);

    gc.rotate((this.angle * Math.PI) / 180);
    gc.translate(-this.width / 2, -this.height / 2);

    gc.beginPath();
    gc.rect(0, 0, this.width, this.height);
    gc.fillStyle = "lightgrey";
    gc.fill();
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.stroke();

    // scale handle
    gc.beginPath();
    gc.arc(this.width, this.height, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // rotate handle
    const x = this.width / 2;
    const y = this.handleSize * 3;
    gc.beginPath();
    gc.moveTo(x, 0);
    gc.lineTo(x, -y);
    gc.strokeStyle = "black";
    gc.stroke();

    gc.beginPath();
    gc.arc(x, -y, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // for debugging
    gc.beginPath();
    gc.arc(this.width / 2, this.height / 2, 3, 0, 2 * Math.PI);
    gc.fillStyle = "red";
    gc.fill();

    gc.restore();
  }
}
