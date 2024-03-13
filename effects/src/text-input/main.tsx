import { render } from "preact";

import { signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

// Application state
const appState = signal("abc");

export default function Test() {
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
    const newValue = (e.target as HTMLInputElement).value;
    // Update local state immediately
    setInputValue(newValue);

    // only if valid, update the app state
    if (isValid(newValue)) {
      appState.value = newValue;
    }
  };

  return (
    <div>
      <button onClick={() => (appState.value = "abc")}>Reset</button>
      <h2>'{appState}'</h2>
      <input
        value={inputValue}
        type="text"
        onInput={handleInput}
        // always leave input field with valid value
        onChange={() => setInputValue(appState.value)}
      />
      {!isValid(inputValue) && <p>Invalid: use a, b, or c</p>}
    </div>
  );
}

render(<Test />, document.body);
