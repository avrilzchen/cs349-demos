// to do some checks on html strings
import html from "html-template-tag";

// local imports
import { Model } from "./model";
import View from "./view";

import "./leftView.css";

export class LeftView implements View {
  //#region observer pattern

  update(): void {
    this.button.innerText = `${this.model.count}`;
  }

  //#endregion

  // the HTML container for this view
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private button: HTMLButtonElement;

  constructor(private model: Model) {
    // create view container using a <template> and HTML tagged template
    var temp = document.createElement("template");
    temp.innerHTML = html`
      <div id="left">
        <button id="increment">?</button>
      </div>
    `;
    this.container = temp.content.firstElementChild as HTMLDivElement;

    // get reference to button using querySelector
    const el = this.container.querySelector(
      "button#increment"
    ) as HTMLButtonElement;
    if (!el) throw new Error("leftView button not found");
    this.button = el;

    // setup the controller
    this.button.addEventListener("click", () => {
      model.increment();
    });

    // register with the model
    this.model.addObserver(this);
  }
}
