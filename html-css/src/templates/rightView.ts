// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class RightView implements Observer {
  //#region observer pattern

  update(): void {
    this.container.innerHTML = "";

    for (let i = 0; i < this.model.count; i++) {
      const view = this.numberSquare.content.cloneNode(
        true
      ) as DocumentFragment;
      const div = view.querySelector("div") as HTMLDivElement;
      div.innerText = `${i + 1}`;
      this.container.appendChild(view);
    }
  }

  //#endregion

  container: HTMLElement;
  numberSquare: HTMLTemplateElement;

  constructor(parent: HTMLElement, private model: Model) {
    // create the view from a template
    const template = document.getElementById(
      "right-view"
    ) as HTMLTemplateElement;
    if (!template) throw new Error("rightView template not found");

    // clone the template to create a new view
    const view = template.content.cloneNode(true) as DocumentFragment;

    // important to do this before inserting into the DOM
    const el = view.getElementById("right") as HTMLElement;
    if (!el) throw new Error("rightView div not found");
    this.container = el;

    // insert view into the parent
    parent.appendChild(view);

    // get reference to template for a single "number square"
    this.numberSquare = document.getElementById(
      "number-square"
    ) as HTMLTemplateElement;

    // register with the model
    this.model.addObserver(this);
  }
}
