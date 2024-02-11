// local imports
import View from "./view";
import { Model } from "./model";

import "./rightView.css";

export class RightView implements View {
  //#region observer pattern

  update(): void {
    // just re-build all children each update

    // remove all current children
    this.container.replaceChildren();

    // create all children to match the model
    [...Array(this.model.count).keys()].forEach((i) => {
      const div = document.createElement("div");
      div.innerText = `${i + 1}`;
      this.container.appendChild(div);
    });
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
    this.container.id = "right";

    // no widgets to setup, they're all created in updates

    // register with the model
    this.model.addObserver(this);
  }
}
