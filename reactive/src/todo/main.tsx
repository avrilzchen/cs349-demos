import { h, render } from "preact";

import "./style.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFormRef from "./TodoFormRef";

export default function App() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
