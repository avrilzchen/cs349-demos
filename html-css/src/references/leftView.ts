// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class LeftView implements Observer {
  //#region observer pattern

  update(): void {
    // use references to update the HTML
    this.button.innerText = `${this.model.count}`;
  }

  //#endregion

  button: HTMLButtonElement;

  constructor(private model: Model) {
    // get reference to button
    const el = document.getElementById(
      "increment"
    ) as HTMLButtonElement;
    if (!el) throw new Error("leftView 'increment' button not found");
    this.button = el;

    // setup the Controller
    this.button.addEventListener("click", () => {
      model.increment();
    });

    // register with the model
    this.model.addObserver(this);
  }
}
