import { h } from "preact";
import { todos } from "./AppState";
import TodoItem from "./TodoItem";

export default function TodoList() {
  return (
    <ul>
      {todos.value.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  );
}
