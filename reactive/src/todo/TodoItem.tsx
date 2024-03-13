import { h } from "preact";
import { Todo, toggleTodo, deleteTodo } from "./AppState";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onInput={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>x</button>
    </li>
  );
}
