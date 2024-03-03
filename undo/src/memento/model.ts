import { Subject } from "./observer";
import { Memento, UndoManager } from "./undo";

export class Model extends Subject {
  //#region undo manager

  private undoManager = new UndoManager();

  undo() {
    const x = this.undoManager.undo();
    console.log(x);
    this._count = x || this._count;
    this.notifyObservers();
  }

  redo() {
    this._count = this.undoManager.redo() || this._count;
    this.notifyObservers();
  }

  canUndo() {
    return this.undoManager.canUndo();
  }

  canRedo() {
    return this.undoManager.canRedo();
  }

  //#endregion

  constructor() {
    super();

    // save the base memento
    this.undoManager.execute({
      state: this._count,
    } as Memento);
  }

  // model data (i.e. model state)
  private _count = 49;
  set count(newValue: number) {
    this._count = newValue;

    // add memento to undo stack
    this.undoManager.execute({
      state: this._count,
    } as Memento);

    // need to notify observers anytime the model changes
    this.notifyObservers();
  }
  get count() {
    return this._count;
  }

  // model "business logic"
  increment() {
    this._count++;

    // add memento to undo stack
    this.undoManager.execute({
      state: this._count,
    } as Memento);

    // need to notify observers anytime the model changes
    this.notifyObservers();
  }

  decrement() {
    this._count--;

    // add memento to undo stack
    this.undoManager.execute({
      state: this._count,
    } as Memento);

    // need to notify observers anytime the model changes
    this.notifyObservers();
  }
}
