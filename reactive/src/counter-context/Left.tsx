import { useContext } from "preact/hooks";

// app state
import { CountContext } from "./CountContext";

export default function LeftView() {
  // get state form context
  const { count, setCount } = useContext(CountContext);

  return (
    <div class="left-view">
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}
