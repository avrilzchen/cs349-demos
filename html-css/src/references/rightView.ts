// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class RightView implements Observer {
  //#region observer pattern

  update(): void {
    // use references to update the HTML
    let html = "";
    for (let i = 0; i < this.model.count; i++) {
      html += `<div>${i + 1}</div>`;
    }
    this.container.innerHTML = html;
  }

  //#endregion

  container: HTMLElement;

  constructor(private model: Model) {
    const el = document.getElementById("right") as HTMLElement;
    if (!el) throw new Error("rightView div not found");
    this.container = el;

    // register with the model
    this.model.addObserver(this);
  }
}
