import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class FormView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    const id = this.model.selectId;
    if (id !== null) {
      this.button.text = "Update";
      this.textfield.text = this.model.todo(id)?.text || "";
    } else {
      this.button.text = "Add";
      this.textfield.text = "";
    }
  }

  //#endregion

  button = new SKButton({ text: "?" });
  textfield = new SKTextfield({ text: "?" });

  constructor(private model: Model) {
    super();

    // setup the view
    this.id = "entry";
    this.fill = "grey";
    this.padding = 10;

    // try removing fillWidth and/or height
    this.fillWidth = 1;
    this.height = 50;

    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    // add widgets to the view
    this.textfield.fillWidth = 1;
    this.addChild(this.textfield);
    this.addChild(this.button);

    // create controller
    this.button.addEventListener("action", () => {
      const text = this.textfield.text;
      if (model.selectId !== null) {
        model.update(model.selectId, { text });
      } else {
        model.create(text);
      }
      this.textfield.text = "";
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
