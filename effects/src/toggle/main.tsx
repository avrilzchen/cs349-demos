import { render } from "preact";
import { useState } from "preact/hooks";
import { signal } from "@preact/signals";

import { Toggle } from "./Toggle";

console.log("toggle");

// global state with a signal
const pear = signal(false);

function App() {
  // local app state with useState
  const [apple, setApple] = useState(true);

  return (
    <>
      <h3>
        Apple: '{apple.toString()}', Pear: '{pear.toString()}'
      </h3>
      <p>
        <Toggle
          checked={apple}
          label="Apple"
          onChange={(e) =>
            setApple((e.currentTarget as HTMLInputElement).checked)
          }
        />
        <Toggle
          checked={pear.value}
          label="Pear"
          onChange={(e) =>
            (pear.value = (
              e.currentTarget as HTMLInputElement
            ).checked)
          }
        />
      </p>
    </>
  );
}

render(<App />, document.body);
