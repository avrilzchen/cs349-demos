// app state
import { count } from "./AppState";

type RightViewProps = {
  colour?: string;
};

export default function RightView({
  colour = "grey",
}: RightViewProps) {
  return (
    <div class="right-view">
      {[...Array(count.value)].map((_, i) => (
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
