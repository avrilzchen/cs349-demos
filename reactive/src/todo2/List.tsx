import { h } from "preact";
import { todos } from "./state";
import TodoItem from "./Todo";

import "./List.css";

export default function List() {
  return (
    <div id="list">
      {todos.value.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
}
