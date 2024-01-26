import {
  insideHitTestRectangle,
  measureText,
} from "simplekit/utility";
import {
  SKElement,
  Style,
  Settings,
} from "simplekit/imperative-mode";

export class SKTextfield extends SKElement {
  state: "idle" | "hover" = "idle";
  focus = false;

  font = Style.font;

  // find size of text to set height (and width if not specified)
  constructor(
    public text: string,
    x: number,
    y: number,
    width?: number
  ) {
    super(x, y);
    this.text = text;

    // if no width or height is specified, calculate the size
    const m = measureText(text, this.font);

    if (!m) {
      console.warn(`measureText failed in SKTextfield for ${text}`);
      return;
    }

    this.height =
      m.fontBoundingBoxAscent +
      m.fontBoundingBoxDescent +
      Style.textPadding;
    this.width = width || m.width + Style.textPadding * 2;
  }

  applyEdit(text: string, key: string): string {
    if (key == "Backspace") {
      return text.slice(0, -1);
    } else if (key.length == 1) {
      return text + key;
    } else return text;
  }

  hittest(mx: number, my: number): boolean {
    return insideHitTestRectangle(
      mx,
      my,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  draw(gc: CanvasRenderingContext2D) {
    const padding = 10;

    gc.save();

    // thick highlight rect
    if (this.state == "hover") {
      gc.beginPath();
      gc.rect(this.x, this.y, this.width, this.height);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // border
    gc.beginPath();
    gc.rect(this.x, this.y, this.width, this.height);
    gc.fillStyle = "white";
    gc.fill();
    gc.lineWidth = 1;
    gc.strokeStyle = this.focus ? Style.focusColour : "black";
    gc.stroke();

    // TODO: highlight text
    if (false) {
      gc.fillStyle = Style.highlightColour;
      gc.fillRect(
        this.x + padding,
        this.y + padding / 2,
        50,
        this.height - padding
      );
    }

    // text
    gc.font = Style.font;
    gc.fillStyle = "black";
    gc.textBaseline = "middle";
    gc.textAlign = "left";
    gc.fillText(
      this.text,
      this.x + padding,
      this.y + this.height / 2
    );

    gc.restore();
  }

  public toString(): string {
    return `SKTextfield '${this.text}' id:${this.id}`;
  }
}
