import { Todo, updateTodo, deleteTodo, selectedTodo } from "./state";

import "./TodoItem.css";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div class="todo" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.done}
        onInput={() => updateTodo(todo.id, { done: !todo.done })}
      />
      <span>{todo.task}</span>
      <button
        onClick={() => (selectedTodo.value = todo.id)}
        disabled={selectedTodo.value === todo.id}
      >
        ✏️
      </button>
      <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
    </div>
  );
}
