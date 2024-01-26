import { measureText } from "simplekit/utility";

import {
  SKElement,
  Style,
  Settings,
} from "simplekit/imperative-mode";

export class SKLabel extends SKElement {
  align: "centre" | "left" | "right" = "centre";

  font = Style.font;

  constructor(
    public text: string,
    x: number,
    y: number,
    width?: number
  ) {
    super(x, y);

    // find size of text to set height (and width if not specified)
    const m = measureText(text, this.font);

    if (!m) {
      console.warn(`measureText failed in SKLabel for ${text}`);
      return;
    }

    this.height =
      m.fontBoundingBoxAscent +
      m.fontBoundingBoxDescent +
      Style.textPadding;
    this.width = width || m.width + Style.textPadding * 2;
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();

    // border (for debug)
    if (Settings.debug) {
      gc.strokeStyle = "grey";
      gc.setLineDash([3, 3]);
      gc.strokeRect(this.x, this.y, this.width, this.height);
    }

    //  label
    gc.font = this.font;
    gc.fillStyle = "black";
    gc.textBaseline = "middle";
    const padding = Style.textPadding;
    switch (this.align) {
      case "left":
        gc.textAlign = "left";
        gc.fillText(
          this.text,
          this.x + padding,
          this.y + this.height / 2
        );
        break;

      case "centre":
        gc.textAlign = "center";
        gc.fillText(
          this.text,
          this.x + this.width / 2,
          this.y + this.height / 2
        );
        break;

      case "right":
        gc.textAlign = "right";
        gc.fillText(
          this.text,
          this.x + this.width - padding,
          this.y + this.height / 2
        );
        break;
    }
    gc.restore();
  }
}
