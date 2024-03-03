// command is specific to the count state
// (each command transforms the count state)
export interface Command {
  do(state: number): number;
}

export class UndoManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  constructor() {}

  // the undo manager is responsible for computing the state
  computeState(base: number): number {
    // go through all commands and compute the new count state
    return this.undoStack.reduce((acc, command) => {
      return command.do(acc);
    }, base);
  }

  execute(command: Command) {
    // just adds command to the "undo" stack
    this.undoStack.push(command);
    this.redoStack = [];
    console.log(this.toString());
  }

  undo() {
    // undo just moves the command to the redo stack
    const command = this.undoStack.pop();
    if (command) {
      this.redoStack.push(command);
    }
    console.log(this.toString());
  }

  redo() {
    // redo just moves the command back to the "undo" stack
    const command = this.redoStack.pop();
    if (command) {
      this.undoStack.push(command);
    }
    console.log(this.toString());
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
