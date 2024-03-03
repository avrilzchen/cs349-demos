// local imports
import View from "./view";
import { Model } from "./model";

import "./todoView.css";

export class TodoView implements View {
  //#region observer pattern

  update(): void {
    const todo = this.model.todo(this.todoId);
    if (!todo) return;
    this.checkbox.checked = todo.done;
    this.todoText.innerText = `${todo.text || "?"} (id#${todo.id})`;
    this.selectButton.disabled = todo.done;
  }

  //#endregion

  checkbox = document.createElement("input");
  todoText = document.createElement("span");
  selectButton = document.createElement("button");
  deleteButton = document.createElement("button");

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model, private todoId: number) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.className = "todo";

    // setup the view
    this.checkbox.type = "checkbox";
    this.deleteButton.innerText = "🗑️";
    this.selectButton.innerText = "✏️";

    // add widgets to the view
    this.container.appendChild(this.checkbox);
    this.container.appendChild(this.todoText);
    this.container.appendChild(this.selectButton);
    this.container.appendChild(this.deleteButton);

    // controllers
    this.checkbox.addEventListener("click", () => {
      model.update(todoId, { done: this.checkbox.checked });
    });
    this.deleteButton.addEventListener("click", () => {
      model.delete(todoId);
    });
    this.selectButton.addEventListener("click", () => {
      model.select(todoId);
    });

    // register with the model
    this.model.addObserver(this);
  }
}
