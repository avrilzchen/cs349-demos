import { Subject } from "./observer";
import { Command, UndoManager } from "./undo";

export class Model extends Subject {
  //#region undo manager

  // set the generic type ot number
  private undoManager = new UndoManager<number>();

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

  readonly startCount = 49;

  save() {
    this.baseCount = this.count;
    // reset the undo manager since new base state
    this.undoManager = new UndoManager();
    this.notifyObservers();
  }

  // this is the base "state" of the model for forward undo
  baseCount = this.startCount;

  // model data (i.e. model state) is computed by undo manager
  set count(newValue: number) {
    // add command to undo stack
    this.undoManager.execute({
      do: (_) => newValue,
    } as Command<number>);
    // need to notify observers any time the model changes
    this.notifyObservers();
  }
  get count() {
    // the undo manager computes the current state from the base
    return this.undoManager.computeState(this.baseCount);
  }

  increment() {
    // add command to undo stack
    this.undoManager.execute({
      do: (state) => state + 1,
    } as Command<number>);

    // need to notify observers any time the model changes
    this.notifyObservers();
  }

  decrement() {
    // add command to undo stack
    this.undoManager.execute({
      do: (state) => state - 1,
    } as Command<number>);

    // need to notify observers any time the model changes
    this.notifyObservers();
  }

  reset() {
    this.count = this.startCount;
  }
}
