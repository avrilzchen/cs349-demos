export {};

import("./style.css");

/**
 * hyberscript
 * @param type
 * @param attributes
 * @param args
 * @returns
 */
// @ts-ignore
function h(type, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;
  return { type, attributes, children };
}

const a = h("p", {}, "Example A");

const b = h("p", { style: "color: red;" }, "Example B");

// prettier-ignore
const c = 
  h("div", { class: "my-div" }, [
    "text inside the div",
    h("p", {}, "Example C"),
]);

// print VDOM tree
console.log(JSON.stringify(c, null, 2));

// @ts-ignore
function render(vnode) {
  // Strings just convert to #text Nodes:
  if (vnode.split) return document.createTextNode(vnode);

  // create a DOM element with the nodeName of our VDOM element:
  let n = document.createElement(vnode.type);

  // copy attributes onto the new node:
  let a = vnode.attributes || {};
  Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));

  // render (build) and then append child nodes:
  (vnode.children || []).forEach((c) => n.appendChild(render(c)));

  return n;
}

document.body.appendChild(render(a));

document.body.appendChild(render(b));

document.body.appendChild(render(c));
