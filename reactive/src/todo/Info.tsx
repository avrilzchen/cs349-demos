import { h } from "preact";
import { num, numDone, selectedTodo } from "./state";

import "./Info.css";

export default function Info() {
  return (
    <div id="info">
      {selectedTodo.value
        ? `edit id#${selectedTodo.value}`
        : `${num} todos (${numDone} done)`}
    </div>
  );
}
