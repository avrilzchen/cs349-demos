import {
  addTodo,
  getTodo,
  selectedTodoId,
  updateTodo,
} from "./state";
import { useState } from "preact/hooks";

import "./Form.css";

export default function Form() {
  // local state for "controlled input"
  const [inputValue, setInputValue] = useState(
    selectedTodoId.value
      ? getTodo(selectedTodoId.value)?.task || "null"
      : ""
  );

  // update local state when user types
  function inputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    setInputValue(newValue);
  }

  function handleSubmit(e: Event) {
    if (selectedTodoId.value) {
      updateTodo(selectedTodoId.value, { task: inputValue });
    } else {
      addTodo(inputValue);
    }
    // setInputValue("");
  }

  return (
    <div id="form">
      <input type="text" onChange={inputHandler} value={inputValue} />
      <button onClick={handleSubmit}>
        {!selectedTodoId.value ? "Add" : "Update"}
      </button>
      (useState)
    </div>
  );
}
