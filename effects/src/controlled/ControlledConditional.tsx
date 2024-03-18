import { useEffect, useState } from "preact/hooks";
import { appState } from "./state";

export default function ControlledConditional() {
  // local state for the input value
  const [inputValue, setInputValue] = useState(appState.value);

  // update local state when app state changes
  useEffect(() => {
    setInputValue(appState.value);
  }, [appState.value]);

  // regex validation
  const isValid = (text: string) => /^[abc]*$/.test(text);

  // handler for input changes
  const handleInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    // Update local state immediately
    setInputValue(el.value);
    // only if valid, update the app state
    if (isValid(el.value)) {
      appState.value = el.value;
    }
  };

  return (
    <>
      <p>ControlledConditional</p>
      <input
        type="text"
        value={inputValue}
        class={!isValid(inputValue) ? "invalid" : ""}
        onInput={handleInput}
        // always leave input field with valid value
        onChange={() => setInputValue(appState.value)}
      />
      {!isValid(inputValue) && (
        <p class="error">Invalid: use a, b, or c</p>
      )}
    </>
  );
}
