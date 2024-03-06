// using generic type for state
export interface Memento<State> {
  state: State;
}
// using generic type for state
export class UndoManager<State> {
  private undoStack: Memento<State>[] = [];
  private redoStack: Memento<State>[] = [];

  // memento must have a base state
  constructor(private base: Memento<State>) {}

  execute(memento: Memento<State>) {
    this.undoStack.push(memento);
    this.redoStack = [];
    console.log(this.toString());
  }

  undo(): State {
    console.log("undo", this.toString());

    // top of undo stack is the current state
    const memento = this.undoStack.pop();
    if (!memento) throw new Error("No more undo states");

    // save current state as a redo
    this.redoStack.push(memento);
    // use the new top of undo stack for undo state
    // (or return base state if no more undo states)
    const prevMemento = this.undoStack.slice(-1)[0] || this.base;
    return prevMemento.state;
  }

  redo(): State {
    console.log("redo", this.toString());

    // top of redo stack is the next state
    const memento = this.redoStack.pop();
    if (!memento) throw new Error("No more redo states");

    // set state to the redo memento state
    this.undoStack.push(memento);
    return memento.state;
  }

  get canUndo() {
    return this.undoStack.length > 0;
  }

  get canRedo() {
    return this.redoStack.length > 0;
  }

  toString() {
    return `undoStack: ${this.undoStack.length}, redoStack: ${this.redoStack.length}`;
  }
}
