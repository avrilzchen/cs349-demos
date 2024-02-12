// local imports
import View from "./view";
import { Model } from "./model";

import "./leftView.css";

export class LeftView implements View {
  //#region observer pattern

  update(): void {
    this.button.innerText = `${this.model.count}`;
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private button: HTMLButtonElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "left";

    // then setup the widgets in the container

    // button with controller
    this.button = document.createElement("button");
    // impossible state to catch errors
    this.button.innerText = "?";
    this.button.addEventListener("click", () => {
      model.increment();
    });
    this.container.appendChild(this.button);

    // register with the model
    this.model.addObserver(this);
  }
}
