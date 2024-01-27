import {
  insideHitTestRectangle,
  measureText,
} from "simplekit/utility";
import { SKElement, SKElementProps, Style } from "../element";

type SKTextfieldProps = SKElementProps & {
  text?: string;
};

export class SKTextfield extends SKElement {
  // find size of text to set height (and width if not specified)
  constructor({ text, ...elementProps }: SKTextfieldProps = {}) {
    super(elementProps);

    // label-specific properties
    this.text = text || "?";

    // find size of text to set height (and width if not specified)
    const m = measureText(this.text, this.font);

    if (!m) {
      console.warn(`measureText failed in SKLabel for ${text}`);
      return;
    }

    // set the height
    this.height = m.height + Style.textPadding * 2;

    // set the width from measure text unless specified in constructor
    this.width =
      elementProps.width || m.width + Style.textPadding * 2;
  }

  text: string;
  font = Style.font;

  state: "idle" | "hover" = "idle";
  focus = false;

  applyEdit(text: string, key: string): string {
    if (key == "Backspace") {
      return text.slice(0, -1);
    } else if (key.length == 1) {
      return text + key;
    } else return text;
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
}
