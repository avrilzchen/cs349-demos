import { render } from "preact";

import LeftView from "./Left";
import RightView from "./Right";

// global styles (e.g. reset)
import "./style.css";

// component styles
import style from "./App.module.css";

console.log("style-module");

export default function App() {
  return (
    // app "root"
    <div class={style.root}>
      {/* container */}
      <div class={style.container}>
        {/* views */}
        <LeftView />
        <RightView colour="lightgreen" />
      </div>
    </div>
  );
}

render(<App />, document.querySelector("div#app") as HTMLElement);
