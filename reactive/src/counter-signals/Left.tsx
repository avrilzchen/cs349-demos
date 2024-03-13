// app state
import { count, increment } from "./AppState";

export default function LeftView() {
  return (
    <div class="left-view">
      {/* could mutate the signal value here instead
      of calling AppState increment mutator  */}
      <button onClick={() => increment()}>{count.value}</button>
    </div>
  );
}
