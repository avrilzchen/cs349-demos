import { todos } from "./state";
import TodoItem from "./TodoItem";

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
