// app state
import { count } from "./state";

type RightViewProps = {
  colour?: string;
};

export default function RightView({
  colour = "grey",
}: RightViewProps) {
  return (
    <div
      // can also define style object in variable
      style={{
        padding: "10px",
        border: "1px solid grey",
        backgroundColor: "white",
        flex: "1 1 0",
        flexFlow: "row wrap",
        display: "flex",
        alignContent: "flex-start",
        overflow: "scroll",
      }}
    >
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
  return (
    <div
      style={{
        margin: "5px",
        padding: "10px",
        flex: "0 0 auto",
        backgroundColor: colour,
      }}
    >
      {num}
    </div>
  );
}
