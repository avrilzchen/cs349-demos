// local imports
import View from "./view";
import { Model } from "./model";

import "./undoBarView.css";

export class UndoBarView implements View {
  //#region observer pattern

  update(): void {
    this.undoButton.disabled = !this.model.canUndo;
    this.redoButton.disabled = !this.model.canRedo;
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private undoButton: HTMLButtonElement;
  private redoButton: HTMLButtonElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "undo-bar";

    // then setup the widgets in the container

    // button with controller
    this.undoButton = document.createElement("button");
    this.undoButton.innerText = "Undo";
    // create controller
    this.undoButton.addEventListener("click", () => {
      model.undo();
    });
    this.container.appendChild(this.undoButton);

    // button with controller
    this.redoButton = document.createElement("button");
    this.redoButton.innerText = "Redo";
    // create controller
    this.redoButton.addEventListener("click", () => {
      model.redo();
    });
    this.container.appendChild(this.redoButton);

    // register with the model
    this.model.addObserver(this);
  }
}
