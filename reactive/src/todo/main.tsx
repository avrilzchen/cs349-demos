import { h, render } from "preact";

import Form from "./Form";
import List from "./List";
import FormRef from "./FormRef";
import Info from "./Info";

import "./main.css";
import { getTodo, selectedTodo } from "./state";

export default function App() {
  const id = selectedTodo.value;
  const value = id && getTodo(id)?.task;

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
