import { render } from "preact";

import LeftView from "./Left";
import RightView from "./Right";

// global styles (e.g. reset)
import "./style.css";

console.log("style-inline");

// inline styles
const rootStyle = {
  backgroundColor: "whitesmoke",
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  height: "100vh",
};

const containerStyle = {
  margin: "50px",
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "row",
  flexFlow: "row nowrap",
  alignItems: "stretch",
  gap: "50px",
};

export default function App() {
  return (
    // app "root"
    <div style={rootStyle}>
      {/* container */}
      <div style={containerStyle}>
        {/* views */}
        <LeftView />
        <RightView colour="pink" />
      </div>
    </div>
  );
}

render(<App />, document.querySelector("div#app") as HTMLElement);
