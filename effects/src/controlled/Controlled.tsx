import { useState } from "preact/hooks";
import { appState } from "./state";

export default function Controlled() {
  const [invalid, setInvalid] = useState(false);

  // regex validation
  const isValid = (text: string) => /^[abc]*$/.test(text);

  function handleInput(e: Event) {
    const el = e.target as HTMLInputElement;
    // validate
    setInvalid(!isValid(el.value));
    // update state (and input value)
    appState.value = el.value;
  }

  return (
    <>
      <p>Controlled</p>
      <input
        type="text"
        value={appState.value}
        class={invalid ? "invalid" : ""}
        onInput={handleInput}
      />
      {invalid && <p class="error">Invalid: use a, b, or c</p>}
    </>
  );
}
