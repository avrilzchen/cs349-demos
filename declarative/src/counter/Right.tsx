import { JSX, h } from "preact";

type RightViewProps = {
  count: number;
  colour?: string;
};

export default function RightView({
  count,
  colour = "aquamarine",
}: RightViewProps) {
  // alternative method to return an array of JSX elements
  // function loop(n: number) {
  //   let nodes: JSX.Element[] = [];
  //   for (let i = 0; i < n; i++) {
  //     nodes.push(<NumberBox num={i + 1} colour={colour} />);
  //   }
  //   return nodes;
  // }

  return (
    <div class="right-view">
      {/* iteration must be an expression  */}
      {[...Array(count)].map((_, i) => (
        <NumberBox num={i + 1} colour={colour} />
      ))}
      {/* {loop(count)} */}
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
