import { Subject } from "./observer";
import { Command, UndoManager } from "./undo";

export class Model extends Subject {
  //#region undo manager

  private undoManager = new UndoManager();

  undo() {
    this.undoManager.undo();
    this.notifyObservers();
  }

  redo() {
    this.undoManager.redo();
    this.notifyObservers();
  }

  get canUndo() {
    return this.undoManager.canUndo;
  }

  get canRedo() {
    return this.undoManager.canRedo;
  }

  //#endregion

  // model data (i.e. model state)
  private _text = "";
  set text(newValue: string) {
    // add command to undo stack
    const oldValue = this._text;
    this.undoManager.execute({
      redo: () => {
        this._text = newValue;
      },
      undo: () => {
        this._text = oldValue;
      },
    } as Command);

    this._text = newValue;
    // need to notify observers any time the model changes
    this.notifyObservers();
  }
  get text() {
    return this._text;
  }
}
