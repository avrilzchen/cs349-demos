// local imports
import View from "./view";
import { Model } from "./model";

import "./editView.css";

export class EditView implements View {
  //#region observer pattern

  update(): void {
    // this.textArea.value = this.model
  }

  //#endregion

  textArea: HTMLTextAreaElement;

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // create the root container
    this.container = document.createElement("div");
    this.container.id = "edit";

    // setup textarea
    this.textArea = document.createElement("textarea");
    this.container.appendChild(this.textArea);
    // controller
    this.textArea.addEventListener("keyup", (e) => {
      console.log(
        `input (${this.textArea.selectionStart}): ${this.textArea.value}`
      );
    });

    // register with the model
    this.model.addObserver(this);
  }
}
