// app state
import { count, increment } from "./state";

import style from "./Left.module.css";

export default function LeftView() {
  return (
    <div class={style.root}>
      <button onClick={() => increment()}>{count.value}</button>
    </div>
  );
}
