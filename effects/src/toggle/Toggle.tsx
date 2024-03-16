import { useState } from "preact/hooks";

import "./Toggle.css";

type ToggleProps = {
  checked?: boolean;
  label?: string;
  onChange?: (e: Event) => void;
};

export function Toggle({
  checked: initChecked = false,
  label = "",
  onChange,
}: ToggleProps) {
  // local state for controlled checkbox
  const [checked, setChecked] = useState(initChecked);

  const changeHandler = (e: Event) => {
    setChecked((e.currentTarget as HTMLInputElement).checked);
    if (onChange) onChange(e);
  };

  return (
    <>
      <label class="toggle">
        <input
          class="toggle-checkbox"
          type="checkbox"
          checked={checked}
          onChange={changeHandler}
        />
        <div class="toggle-switch" style={{ scale: "70%" }}></div>
        {label && <span class="toggle-label">{label}</span>}
      </label>
    </>
  );
}
