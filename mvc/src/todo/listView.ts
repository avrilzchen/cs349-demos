import {
  SKContainer,
  SKLabel,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { makeStackColLayout } from "./stackCol";
import { TodoView } from "./todoView";

export class ListView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    // Simplest thing to do is clear all children and build todo
    // list each time model updates. If performance becomes an issue,
    // then add code to keep undos with matching ids, etc.
    this.clearChildren();

    // go through list of Todos, create a View for each
    this.model.all().forEach((t) => {
      this.addChild(new TodoView(this.model, t.id));
    });
  }

  //#endregion

  constructor(private model: Model) {
    super();

    // setup the view design
    this.padding = 5;
    this.fillWidth = 1;
    this.height = 500;
    this.fillHeight = 1;
    // this.debug = true;

    // use a custom layout in this app
    this.layoutMethod = makeStackColLayout();

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
