// app state
import * as State from "./state";

export default function LeftView() {
  return (
    <div class="left-view">
      {/* could mutate the signal value here instead
      of calling State increment mutator  */}
      <button onClick={() => State.increment()}>
        {State.count.value}
      </button>
    </div>
  );
}
