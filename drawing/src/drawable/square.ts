import { Drawable } from "./drawable";

// basic drawable square
export class Square implements Drawable {
  constructor(public x: number, public y: number, public size: number) {}

  fill: string | undefined;
  stroke: string | undefined;
  lineWidth: number | undefined;

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    gc.fill();
    gc.stroke();
  }
}
