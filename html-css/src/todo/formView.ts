// local imports
import View from "./view";
import { Model } from "./model";

import "./formView.css";

export class FormView implements View {
  //#region observer pattern

  update(): void {
    const id = this.model.selectId;
    if (id !== null) {
      this.button.innerText = "Update";
      this.textfield.value = this.model.todo(id)?.task || "";
    } else {
      this.button.innerText = "Add";
      this.textfield.value = "";
    }
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private textfield: HTMLInputElement;
  private button: HTMLButtonElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "form";

    // then setup the widgets in the container

    // textfield
    this.textfield = document.createElement("input");
    this.textfield.type = "text";
    this.textfield.value = "?";
    this.container.appendChild(this.textfield);

    // button with controller
    this.button = document.createElement("button");
    this.button.innerText = "?";
    // create controller
    this.button.addEventListener("click", () => {
      const text = this.textfield.value;
      if (model.selectId !== null) {
        model.update(model.selectId, { text });
      } else {
        model.create(text);
      }
      this.textfield.value = "";
    });
    this.container.appendChild(this.button);

    // register with the model
    this.model.addObserver(this);
  }
}
