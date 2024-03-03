export interface Memento {
  state: number;
}

export class UndoManager {
  private undoStack: Memento[] = [];
  private redoStack: Memento[] = [];

  constructor() {}

  execute(command: Memento) {
    this.undoStack.push(command);
    this.redoStack = [];
    console.log(this.toString());
  }

  undo(): number | undefined {
    // top of undo stack is the current state
    const memento = this.undoStack.pop();
    if (memento) {
      // save current state as a redo
      this.redoStack.push(memento);
      // use the new top of undo stack for undo state
      const prevMemento = this.undoStack[this.undoStack.length - 1];
      return prevMemento.state;
    }
    console.log(this.toString());
  }

  redo(): number | undefined {
    // top of redo stack is the next state
    const memento = this.redoStack.pop();
    if (memento) {
      // set state to the redo memento state
      this.undoStack.push(memento);
      return memento.state;
    }
    console.log(this.toString());
  }

  canUndo() {
    // need at least 2 states to undo
    // at least one prev state and the current state
    return this.undoStack.length > 1;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  toString() {
    return `undoStack: ${this.undoStack.length}, redoStack: ${this.redoStack.length}`;
  }
}
