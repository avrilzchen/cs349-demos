import TodoItem from "./TodoItem";

import "./List.css";

import * as State from "./state";

export default function List() {
  return (
    <div id="list">
      {State.todos.value.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
}
