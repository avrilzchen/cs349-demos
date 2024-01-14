import { Drawable } from "./drawable";

export class Button implements Drawable {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public text: string
  ) {}

  isHighlighted = false;

  draw(gc: CanvasRenderingContext2D) {
    gc.save();

    // thick highlight rect
    if (this.isHighlighted) {
      gc.beginPath();
      gc.roundRect(this.x, this.y, this.w, this.h, 4);
      gc.strokeStyle = "yellow";
      gc.lineWidth = 10;
      gc.stroke();
    }

    // normal background
    gc.beginPath();
    gc.roundRect(this.x, this.y, this.w, this.h, 4);
    gc.fillStyle = "lightgrey";
    gc.strokeStyle = "black";
    gc.lineWidth = 3;
    gc.fill();
    gc.stroke();

    // button label
    gc.font = "16pt sans-serif";
    gc.fillStyle = "black";
    gc.textAlign = "center";
    gc.textBaseline = "middle";
    gc.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2);

    gc.restore();
  }
}
