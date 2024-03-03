// local imports
import { Model } from "./model";
import View from "./view";

export class ToolbarView implements View {
  //#region observer pattern

  update(): void {
    this.undoButton.disabled = !this.model.canUndo;
    this.redoButton.disabled = !this.model.canRedo;
  }

  //#endregion

  undoButton: HTMLButtonElement;
  redoButton: HTMLButtonElement;

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // create the root container
    this.container = document.createElement("div");
    this.container.id = "toolbar";

    // undo button
    this.undoButton = document.createElement("button");
    this.undoButton.innerText = "Undo";
    this.undoButton.name = "undo";
    this.container.appendChild(this.undoButton);
    this.undoButton.addEventListener("click", () => {
      // console.log("undo");
      model.undo();
    });

    // redo button
    this.redoButton = document.createElement("button");
    this.redoButton.innerText = "Redo";
    this.redoButton.name = "redo";
    this.container.appendChild(this.redoButton);
    this.redoButton.addEventListener("click", () => {
      // console.log("redo");
      model.redo();
    });

    // register with the model
    this.model.addObserver(this);
  }
}
