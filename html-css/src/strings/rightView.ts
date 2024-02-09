// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class RightView implements Observer {
  //#region observer pattern

  update(): void {
    // re-build all child divs each update
    let html = "";
    for (let i = 0; i < this.model.count; i++) {
      html += `<div>${i + 1}</div>`;
    }
    this.container.innerHTML = html;
  }

  //#endregion

  container: HTMLElement;

  constructor(parent: HTMLElement, private model: Model) {
    parent.insertAdjacentHTML(
      "beforeend",
      `
      <div id="right"></div>
      `
    );

    // get reference to container using querySelector
    const el = parent.querySelector("div#right") as HTMLElement;
    if (!el) throw new Error("rightView div not found");
    this.container = el;

    // register with the model
    this.model.addObserver(this);
  }
}
