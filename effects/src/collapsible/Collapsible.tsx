import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

type CollapsibleProps = {
  open?: boolean;
  label: string;
  children: ComponentChildren;
};

export function Collapsible({
  open: initializeOpen = false,
  label,
  children,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(initializeOpen);

  return (
    <div>
      <p
        style={{ background: "whitesmoke", cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "[-]" : "[+]"} {label}
      </p>

      {isOpen && <div class="content">{children}</div>}
    </div>
  );
}
