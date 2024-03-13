import { h, render } from "preact";

import Form from "./Form";
import List from "./List";
import FormRef from "./FormRef";
import Info from "./Info";

import "./main.css";

export default function App() {
  return (
    <>
      <div id="left">
        <Form />
        <List />
      </div>
      <Info />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
