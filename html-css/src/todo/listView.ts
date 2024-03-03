// local imports
import View from "./view";
import { Model } from "./model";
import { TodoView } from "./todoView";

import "./listView.css";

export class ListView implements View {
  //#region observer pattern

  update(): void {
    // Simplest thing to do is clear all children and build todo
    // list each time model updates. If performance becomes an issue,
    // then add code to keep undos with matching ids, etc.

    // TODO should remove all child observers from model to avoid memory leak

    // remove all current children
    this.container.replaceChildren();

    // go through list of Todos, create a View for each
    this.model.all().forEach((t) => {
      this.container.appendChild(new TodoView(this.model, t.id).root);
    });
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "list";

    // no widgets to setup, they're all created in updates

    // register with the model
    this.model.addObserver(this);
  }
}
