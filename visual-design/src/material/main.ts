import "./style.css";

console.log("material");

// load material webcomponents
import "@material/web/button/filled-button";
import "@material/web/button/outlined-button";
import "@material/web/button/elevated-button";
import "@material/web/checkbox/checkbox";
import "@material/web/switch/switch";

// get switch element type
import { MdSwitch } from "@material/web/switch/switch";

const s = document.querySelector("#switch") as MdSwitch;

s.addEventListener("change", (e) => {
  console.log(e);
});
