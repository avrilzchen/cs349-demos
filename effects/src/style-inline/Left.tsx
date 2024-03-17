// app state
import { count, increment } from "./state";

export default function LeftView() {
  return (
    <div
      // can also define style object in variable
      style={{
        padding: "10px",
        border: "1px solid grey",
        backgroundColor: "white",
        flex: "1 1 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        style={{ minWidth: "80px" }}
        onClick={() => increment()}
      >
        {count.value}
      </button>
    </div>
  );
}
