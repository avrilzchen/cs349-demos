/**
 * Demo implementations of a simple virtual DOM library.
 * Inspired and based on:
 *   https://dev.to/fromaline/hyperscript-the-hidden-language-of-react-3d1f
 *   https://github.com/zserge/o
 */

/**
 * hyperscript virtual node definition
 * @typedef {string} tag name or text
 * @typedef {Object.<string, string>} attributes
 * @typedef {VNode} children
 */
export function h(tag, attributes = {}, ..._children) {
  // force children to be an array (possibly empty)
  const children = [].concat(..._children);
  return { tag, attributes, children };
}

/**
 * render hyperscript virtual node tree into a DOM element
 * @typedef {VNode} vnode root of hyperscript virtual node tree
 * @typedef {HTMLElement} dom element to render into
 */
export function render(vnode, dom) {
  dom.replaceChildren(_render(vnode));
}

/**
 * render hyperscript virtual node to a DOM element
 * (recursive calls produce a DOM tree fragment)
 * @typedef {VNode} vnode hyperscript virtual node
 * @returns {HTMLElement} root element with children
 */
function _render(vnode) {
  // if vnode is a string, create text node
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // vnode is a tag, so create corresponding DOM element
  let el = document.createElement(vnode.tag);

  // copy vnode attributes into new DOM element
  let attributes = vnode.attributes || {};
  Object.keys(attributes).forEach((k) => {
    if (k.startsWith("on")) {
      // special case for event listener attributes
      const type = k.substring(2).toLowerCase();
      const handler = attributes[k];
      el.addEventListener(type, handler);
    } else {
      // just a normal attribute
      const name = k;
      const value = attributes[k];
      el.setAttribute(name, value);
    }
  });

  // recursively render child nodes
  (vnode.children || []).forEach((c) => el.appendChild(_render(c)));

  return el;
}

/**
 * from: https://github.com/zserge/o
 *
 * Create a virtual node based on the HTML-like template string, i.e:
 * `<tag attr="value" attr2="value2"></tag>`. Tags can be self-closing.
 * Attribute values must be double quoted, unless they are placeholders.
 * Placeholders can appear only as tag names, attribute values or in between
 * the tags, like text or child elements.
 *
 * @function
 * @param {Array.<string>} strings - An array of raw string values from the template.
 * @param {...*} [fields] - Variadic arguments, containing the placeholders in between.
 * @returns {VNode} - A virtual node with properties and children based on the
 * provided HTML markup.
 *
 * @example
 * x`<div className="foo"><h1>${mytext}</h1></div>`;
 * x`<div className=${myClass} />`;
 * x`<${MyComponent} foo="42"><p>Hello</p></${MyComponent}>`;
 */
export const html = (strings, ...fields) => {
  // Stack of nested tags. Start with a fake top node. The actual top virtual
  // node would become the first child of this node.
  const stack = [h()];
  // Three distinct parser states: text between the tags, open tag with
  // attributes and closing tag. Parser starts in text mode.
  const MODE_TEXT = 0;
  const MODE_OPEN_TAG = 1;
  const MODE_CLOSE_TAG = 2;
  let mode = MODE_TEXT;
  // Read and return the next word from the string, starting at position i. If
  // the string is empty - return the corresponding placeholder field.
  const readToken = (s, i, regexp, field) => {
    s = s.substring(i);
    if (!s) {
      return [s, field];
    }
    const m = s.match(regexp);
    return [s.substring(m[0].length), m[1]];
  };
  strings.forEach((s, i) => {
    while (s) {
      let val;
      s = s.trimLeft();
      switch (mode) {
        case MODE_TEXT:
          // In text mode, we expect either `</` (closing tag) or `<` (opening tag), or raw text.
          // Depending on what we found, switch parser mode. For opening tag - push a new h() node
          // to the stack.
          if (s[0] === "<") {
            if (s[1] === "/") {
              [s] = readToken(s, 2, /^(\w+)/, fields[i]);
              mode = MODE_CLOSE_TAG;
            } else {
              [s, val] = readToken(s, 1, /^(\w+)/, fields[i]);
              stack.push(h(val, {}));
              mode = MODE_OPEN_TAG;
            }
          } else {
            [s, val] = readToken(s, 0, /^([^<]+)/, "");
            console.log(stack);
            stack[stack.length - 1].children.push(val);
          }
          break;
        case MODE_OPEN_TAG:
          // Within the opening tag, look for `/>` (self-closing tag), or just
          // `>`, or attribute key/value pair. Switch mode back to "text" when
          // tag is ended. For attributes, put key/value pair to the properties
          // map of the top-level node from the stack.
          if (s[0] === "/" && s[1] === ">") {
            stack[stack.length - 2].children.push(stack.pop());
            mode = MODE_TEXT;
            s = s.substring(2);
          } else if (s[0] === ">") {
            mode = MODE_TEXT;
            s = s.substring(1);
          } else {
            [s, val] = readToken(s, 0, /^([\w-]+)=/, "");
            console.assert(val);
            let propName = val;
            [s, val] = readToken(s, 0, /^"([^"]*)"/, fields[i]);
            stack[stack.length - 1].attributes[propName] = val;
          }
          break;
        case MODE_CLOSE_TAG:
          // In closing tag mode we only look for the `>` to switch back to the
          // text mode. Top level node is popped from the stack and appended to
          // the children array of the next node from the stack.
          console.assert(s[0] === ">");
          stack[stack.length - 2].children.push(stack.pop());
          s = s.substring(1);
          mode = MODE_TEXT;
          break;
      }
    }
    if (mode === MODE_TEXT) {
      stack[stack.length - 1].children = stack[
        stack.length - 1
      ].children.concat(fields[i]);
    }
  });
  return stack[0].children[0];
};
