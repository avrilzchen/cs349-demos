import html from "html-template-tag";

// local imports
import { Model } from "./model";
import View from "./view";

import "./rightView.css";

export class RightView implements View {
  //#region observer pattern

  update(): void {
    // re-build all child divs each update
    let html = "";
    [...Array(this.model.count).keys()].forEach((i) => {
      html += `<div>${i + 1}</div>`;
    });
    console.log("rightView update", html);
    this.container.innerHTML = html;
  }

  //#endregion

  // the actual HTML element hosting this view
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // create view container using a <template> and HTML tagged template
    var temp = document.createElement("template");
    temp.innerHTML = html` <div id="right"></div> `;
    this.container = temp.content.firstElementChild as HTMLDivElement;

    // register with the model
    this.model.addObserver(this);
  }
}
