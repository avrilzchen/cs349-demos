import "./Info.css";

// State and signal shortcuts:
// (1) You can import state members directly without namespace.
// (2) You can leave out the ".value" part of a signal when
//     retrieving the value in JSX or HTM.
// But you should only consider doing this when the state context
// is clear, such as a small component (as is the case here).

import { num, numDone, selectedTodoId } from "./state";

export default function Info() {
  return (
    <div id="info">
      {selectedTodoId.value != null
        ? `edit id#${selectedTodoId}`
        : `${num} todos (${numDone} done)`}
    </div>
  );
}
