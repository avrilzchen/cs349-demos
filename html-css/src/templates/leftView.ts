// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class LeftView implements Observer {
  //#region observer pattern

  update(): void {
    this.button.innerText = `${this.model.count}`;
  }

  //#endregion

  button: HTMLButtonElement;

  constructor(parent: HTMLElement, private model: Model) {
    // create the view from a template
    const template = document.getElementById(
      "left-view"
    ) as HTMLTemplateElement;
    if (!template) throw new Error("leftView template not found");

    // clone the template to create a new view
    const view = template.content.cloneNode(true) as DocumentFragment;

    // important to do this before inserting into the DOM
    const el = view.querySelector(
      "button#increment"
    ) as HTMLButtonElement;
    if (!el) throw new Error("leftView button not found");
    this.button = el;

    // insert view into the parent
    parent.appendChild(view);

    // // this is the Controller
    this.button.addEventListener("click", () => {
      model.increment();
    });

    // register with the model
    this.model.addObserver(this);
  }
}
