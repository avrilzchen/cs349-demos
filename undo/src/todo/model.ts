import { Subject } from "./observer";
import { Command, UndoManager } from "./undo";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// super simple "id generator"
let uniqueId = 1;

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

  canUndo() {
    return this.undoManager.canUndo();
  }

  canRedo() {
    return this.undoManager.canRedo();
  }

  //#endregion

  // model data (i.e. model state)
  private todos: Todo[] = [];

  // information methods
  get num() {
    return this.todos.length;
  }

  get numDone() {
    return this.todos.filter((t) => t.done).length;
  }

  // model "business logic" (CRUD)

  // Create
  create(task: string) {
    // undo add command

    this.todos = [
      ...this.todos,
      { id: uniqueId++, text: task, done: false },
    ];
    this.notifyObservers();
  }

  // Read
  todo(id: number): Todo | undefined {
    return this.todos.find((t) => t.id === id);
    // no need to notify observers since data not changed
  }

  all(): Todo[] {
    // return a copy (avoids bugs if views try to edit)
    return [...this.todos];
  }

  // Update
  update(id: number, todo: { text?: string; done?: boolean }) {
    // undo update command

    this.todos = this.todos.map((t) =>
      // if todo matches id, then spread it and replace
      // with defined properties in todo object argument
      t.id === id ? { ...t, ...todo } : t
    );
    this._selectId = null;
    this.notifyObservers();
  }

  // select a todo to edit
  private _selectId: number | null = null;
  get selectId() {
    return this._selectId;
  }
  select(id: number) {
    // no undo for selecting a todo

    this._selectId = id;
    this.notifyObservers();
  }

  // Delete
  delete(id: number) {
    // undo delete command

    this.todos = this.todos.filter((t) => t.id !== id);
    // edge case if editing a todo that is deleted
    if (this._selectId === id) this._selectId = null;
    this.notifyObservers();
  }
}
