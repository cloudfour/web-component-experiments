let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style> h1 { color: red; }</style>
    <h1>Hello World!</h1>
  <slot></slot>
`;


class HelloWorld extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
};
window.customElements.define('hello-world', HelloWorld);