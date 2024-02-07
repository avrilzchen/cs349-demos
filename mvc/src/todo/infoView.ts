import {
  SKContainer,
  SKLabel,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class InfoView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    const num = this.model.num;
    if (num === 0) {
      this.message.text = "no todos!";
    } else if (this.model.selectId !== null) {
      this.message.text = `edit id#${this.model.selectId}`;
    } else {
      let text = `${num} todo${num > 1 ? "s" : ""}`;
      if (this.model.numDone > 0) {
        text += ` (${this.model.numDone} done)`;
      }

      this.message.text = text;
    }
  }

  //#endregion

  message = new SKLabel({ text: "?" });

  constructor(private model: Model) {
    super();

    this.width = 150;
    this.fill = "lightgrey";
    this.fillHeight = 1;

    // setup the view
    this.layoutMethod = Layout.makeCentredLayout();

    this.addChild(this.message);

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
