import { appState } from "./state";

export default function Uncontrolled() {
  function handleInput(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    // update state
    appState.value = newValue;
  }

  return (
    <>
      <p>Uncontrolled</p>
      <input type="text" onChange={handleInput} />
    </>
  );
}
