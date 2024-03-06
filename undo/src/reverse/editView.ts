import html from "html-template-tag";

// local imports
import { Model } from "./model";
import View from "./view";

export class EditView implements View {
  //#region observer pattern

  update(): void {
    this.rangeInput.value = this.model.count.toString();
    this.numberInput.value = this.model.count.toString();
  }

  //#endregion

  rangeInput: HTMLInputElement;
  numberInput: HTMLInputElement;

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // create the root container
    this.container = document.createElement("div");
    this.container.id = "edit";
    // using string literal to create HTML
    this.container.innerHTML = html`
      <button name="decrement">-</button>
      <button name="increment">+</button>
      <input type="range" min="0" max="100" style="width: 250px;" />
      <input type="number" min="0" max="100" style="width: 50px;" />
      <button name="reset">Reset</button>
    `;

    // convenience function
    function throwError(msg: string) {
      throw new Error(msg);
    }

    // setup increment button
    const incrementButton =
      (this.container.querySelector(
        "button[name=increment]"
      ) as HTMLButtonElement) ||
      throwError("increment button not found");
    // controller
    incrementButton.addEventListener("click", () => {
      console.log("increment");
      model.increment();
    });

    // setup decrement button
    const decrementButton =
      (this.container.querySelector(
        "button[name=decrement]"
      ) as HTMLButtonElement) ||
      throwError("increment button not found");
    // controller
    decrementButton.addEventListener("click", () => {
      console.log("decrement");
      model.decrement();
    });

    // setup range input
    this.rangeInput =
      (this.container.querySelector(
        "div#edit>input[type=range]"
      ) as HTMLInputElement) ||
      throwError("div#edit>input[type=range] not found");
    // "change" event fired when user releases mouse button
    this.rangeInput.addEventListener("change", () => {
      model.count = parseInt(this.rangeInput.value);
    });

    // setup text span to show count
    this.numberInput =
      (this.container.querySelector(
        "div#edit>input[type=number]"
      ) as HTMLInputElement) ||
      throwError("div#edit>input[type=number] not found");
    this.numberInput.addEventListener("change", () => {
      model.count = parseInt(this.numberInput.value);
    });

    // setup reset button
    const resetButton =
      (this.container.querySelector(
        "div#edit>button[name=reset]"
      ) as HTMLButtonElement) ||
      throwError("div#edit>button[name=reset] not found");
    resetButton.addEventListener("click", () => {
      model.reset();
    });

    // uncomment to see poor undo granularity
    // "input" event fired when user moves the slider
    // this.rangeInput.addEventListener("input", () => {
    //   model.count = parseInt(this.rangeInput.value);
    // });

    // register with the model
    this.model.addObserver(this);
  }
}
