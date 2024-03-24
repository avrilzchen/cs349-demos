import { render, ComponentChildren } from "preact";

console.log("as-element");

type CalloutProps = {
  as: any;
  children: ComponentChildren;
};

export default function Callout({
  as: Element = "div",
  children,
}: CalloutProps) {
  return <Element className="callout">{children}</Element>;
}

// try changing the `as` prop to aside, blockquote, h1, etc.
// then check the rendered HTML
render(
  <Callout as="section">as-element content</Callout>,
  document.querySelector("div#app") as HTMLElement
);
