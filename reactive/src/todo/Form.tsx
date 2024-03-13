import { addTodo, selectedTodo, updateTodo } from "./state";
import { useRef } from "preact/hooks";

import "./Form.css";

type FormProps = {
  editId: number | null;
  initialValue?: string;
};

export default function Form({ editId, initialValue }: FormProps) {
  // reference hook for input element
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: Event) {
    // get input element value using ref hook
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;

    if (editId) {
      updateTodo(editId, { task: inputValue });
    } else {
      addTodo(inputValue);
    }
    selectedTodo.value = null;
  }

  return (
    <div id="form">
      <input type="text" ref={inputRef} value={initialValue || ""} />
      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}
