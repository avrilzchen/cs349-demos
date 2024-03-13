import { render } from "preact";

import Form from "./Form";
import List from "./List";
import Info from "./Info";

import "./main.css";

import * as State from "./state";

export default function App() {
  const id = State.selectedTodoId.value;
  const value = id && State.getTodo(id)?.task;

  return (
    <>
      <div id="left">
        <Form editId={id} initialValue={value || ""} />
        <List />
      </div>
      <Info />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
