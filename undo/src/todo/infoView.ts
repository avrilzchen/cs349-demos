// local imports
import View from "./view";
import { Model } from "./model";

import "./infoView.css";

export class InfoView implements View {
  //#region observer pattern

  update() {
    const num = this.model.num;
    if (num === 0) {
      this.container.innerText = "no todos!";
    } else if (this.model.selectId !== null) {
      this.container.innerText = `edit id#${this.model.selectId}`;
    } else {
      let text = `${num} todo${num > 1 ? "s" : ""}`;
      if (this.model.numDone > 0) {
        text += ` (${this.model.numDone} done)`;
      }

      this.container.innerText = text;
    }
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "info";

    // register with the model
    this.model.addObserver(this);
  }
}
