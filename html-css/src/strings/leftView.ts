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
    // using string literal to create HTML
    parent.insertAdjacentHTML(
      "beforeend",
      `
      <div id="left">
        <button id="increment">?</button>
      </div>
      `
    );

    // get reference to button using querySelector
    const el = parent.querySelector(
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

document.body.innerHTML = `
  <div class="flex-col">
    <p class="label">
      A message
    </dpv>
    <button id="b">Ok</button>
  </div>`;
