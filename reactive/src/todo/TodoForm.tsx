import { h } from "preact";
import { addTodo, numCompleted, todos } from "./AppState";
import { useState } from "preact/hooks";

export default function TodoForm() {
  // local state for "controlled input"
  const [inputValue, setInputValue] = useState("");

  // update local state when user types
  function inputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    setInputValue(newValue);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(inputValue);
        setInputValue("");
      }}
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        onChange={inputHandler}
        value={inputValue}
        size={40}
      />{" "}
      (useState)
      <p>
        {todos.value.length} todos, {numCompleted} completed
      </p>
    </form>
  );
}
