import { h } from "preact";
import { addTodo, numDone, todos } from "./state";
import { useRef } from "preact/hooks";

export default function FormRef() {
  // ref hook for "controlled input"
  const inputRef = useRef<HTMLInputElement>(null);

  // update local state when user types
  function inputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    inputRef.current!.value = newValue;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(inputRef.current!.value);
        inputRef.current!.value = "";
      }}
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        onChange={inputHandler}
        ref={inputRef}
        size={40}
      />{" "}
      (useRef)
      <p>
        {todos.value.length} todos, {numDone} completed
      </p>
    </form>
  );
}
