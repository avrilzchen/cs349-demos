import { render } from "preact";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "preact/hooks";

import LeftView from "./Left";
import RightView from "./Right";

import "./style.css";

console.log("counter");

// function useCounter() {
//   const [value, setValue] = useState(0);
//   const increment = useCallback(() => {
//     setValue(value + 1);
//   }, [value]);
//   return { value, increment };
// }

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect");
  }, [count]);

  // event handler to pass to component
  function handleClick() {
    console.log("click");
    // update state
    setCount(count + 1);
  }

  return (
    <>
      <LeftView count={count} handleClick={handleClick} />
      <RightView count={count} colour="pink" />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
