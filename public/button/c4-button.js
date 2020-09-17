let tmpl = document.createElement('template');

const styles = `
  .button {
    background: #215cca;
    border-color: #183889;
    border-radius: 0.26em;
    border-style: solid;
    border-width: 0.125rem;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: "Source Sans Pro", Tahoma, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1em;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    padding: 0.41em 1.25em;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: 
      filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    user-select: none;
  }

  .button:hover {
    filter: brightness(110%);
    transform: scale(1.05);
  }

  .button:active {
    filter: brightness(80%);
    transform: scale(0.95);
  }

  .button:disabled {
    cursor: not-allowed;
    filter: grayscale(60%);
    opacity: 0.85;
    transform: none;
  }

  .button:focus {
    box-shadow: 0 0 0 3.81em #8abfff;
  }

  .secondary,
  .tertiary {
    background-color: transparent;
    color: #215cca;
  }

  .secondary {
    border-color: #3d84f5;
  }

  .tertiary {
    border-color: transparent;
  }
`;

class C4Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    tmpl.innerHTML = `
      <style>${styles}</style>
      ${this.getContent()}
    `;

    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  getContent() {
    const tag = this.getAttribute('tag') || 'button';
    const buttonClass = this.getAttribute('button-class') || '';
    const type = this.getAttribute('tag') || null;
    const href = this.getAttribute('href') || null;
    const disabled = this.getAttribute('disabled') || false;

    let content;

    if(tag === 'a') {
      content = `
        <a href="${href}" class="button ${buttonClass}">
          <slot/>
        </a>
      `;
    } else {
      content = `
        <${tag}
          class="button ${buttonClass}"
          ${disabled? 'disabled' : ''}
          ${type ? 'type' : ''}
        >
          <slot/>
        </${tag}>
      `;
    }

    return content;
  }
};

customElements.define('c4-button', C4Button);