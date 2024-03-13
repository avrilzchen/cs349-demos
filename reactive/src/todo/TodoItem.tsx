import "./TodoItem.css";

import * as State from "./state";

type TodoItemProps = {
  todo: State.Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div class="todo" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.done}
        onInput={() =>
          State.updateTodo(todo.id, { done: !todo.done })
        }
      />
      <span>
        {todo.task} (id#{todo.id})
      </span>
      <button
        onClick={() => (State.selectedTodoId.value = todo.id)}
        disabled={State.selectedTodoId.value === todo.id}
      >
        ✏️
      </button>
      <button onClick={() => State.deleteTodo(todo.id)}>🗑️</button>
    </div>
  );
}
