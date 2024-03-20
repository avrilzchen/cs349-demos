// simple drawable circle
export class Circle {
  constructor(
    public x: number,
    public y: number,
    public diameter: number = 64,
    public colour = "rgba(255, 0, 0, 0.9)"
  ) {}

  hitTest(mx: number, my: number) {
    const dx = mx - this.x;
    const dy = my - this.y;
    const r = this.diameter / 2;
    return dx * dx + dy * dy <= r * r;
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.fillStyle = this.colour;

    gc.strokeStyle = "black";
    gc.beginPath();
    gc.arc(this.x, this.y, this.diameter / 2, 0, 2 * Math.PI);
    gc.fill();
    gc.stroke();
    gc.restore();
  }
}
