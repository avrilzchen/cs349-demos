import { Subject } from "./observer";
import { Memento, UndoManager } from "./undo";

export class Model extends Subject {
  //#region undo manager

  private undoManager;

  undo() {
    this._count = this.undoManager.undo();
    this.notifyObservers();
  }

  redo() {
    this._count = this.undoManager.redo();
    this.notifyObservers();
  }

  get canUndo() {
    return this.undoManager.canUndo;
  }

  get canRedo() {
    return this.undoManager.canRedo;
  }

  //#endregion

  constructor() {
    super();

    // create UndoManager with a memento for base state
    this.undoManager = new UndoManager<number>({
      state: this._count,
    } as Memento<number>);
  }

  readonly startCount = 49;

  // model data (i.e. model state)
  private _count = this.startCount;
  set count(newValue: number) {
    this._count = newValue;

    // add memento to undo stack
    this.undoManager.execute({
      state: this._count,
    } as Memento<number>);

    // need to notify observers any time the model changes
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
    } as Memento<number>);

    // need to notify observers any time the model changes
    this.notifyObservers();
  }

  decrement() {
    this._count--;

    // add memento to undo stack
    this.undoManager.execute({
      state: this._count,
    } as Memento<number>);

    // need to notify observers any time the model changes
    this.notifyObservers();
  }

  reset() {
    this.count = this.startCount;
  }
}
