import { h } from "preact";
import { useContext } from "preact/hooks";
// app state
import { CountContext } from "./CountContext";

export default function RightView() {
  // get state form context
  const { count, colour } = useContext(CountContext);

  return (
    <div class="right-view">
      {[...Array(count)].map((_, i) => (
        <NumberBox num={i + 1} colour={colour} />
      ))}
    </div>
  );
}

// A component for the box with a number in it.
type NumberBoxProps = {
  num: number;
  colour: string;
};

function NumberBox({ num, colour }: NumberBoxProps) {
  // note style attribute is set using a template literal
  return <div style={{ backgroundColor: colour }}>{num}</div>;
}
