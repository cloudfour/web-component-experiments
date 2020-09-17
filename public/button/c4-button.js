let tmpl = document.createElement('template');

const styles = `
  .button {
    --c4-font-brand: "Source Sans Pro", Tahoma, "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    --c4-color-white: #fff;
    --c4-color-dark: rgba(0, 0, 0, 0.85);
    --c4-color-gray: #738da0;
    --c4-color-brand: #215cca;
    --c4-color-focus: #8abfff;
    --c4-color-background: var(--c4-color-white);
    --c4-color-text: var(--c4-color-dark);
    --c4-size-n6: 0.26em;
    --c4-size-n5: 0.33em;
    --c4-size-n4: 0.41em;
    --c4-size-n3: 0.51em;
    --c4-size-n2: 0.64em;
    --c4-size-n1: 0.8em;
    --c4-size-0: 1em;
    --c4-size-1: 1.25em;
    --c4-size-2: 1.56em;
    --c4-size-3: 1.95em;
    --c4-size-4: 2.44em;
    --c4-size-5: 3.05em;
    --c4-size-6: 3.81em;
    --c4-border-med: 0.125rem;
    --c4-border-thick: var(--c4-size-n6);
    --c4-border-radius-med: var(--c4-size-n6);
    --c4-focus-shadow: 0 0 0 var(--c4-border-thick) #8abfff;
    --c4-staggered-margin: var(--c4-size-0);

    background: var(--c4-color-brand, #215cca);
    border-color: var(--c4-color-button-border, #183889);
    border-radius: var(--c4-border-radius-med);
    border-style: solid;
    border-width: var(--c4-border-med);
    color: var(--c4-color-white, #fff);
    cursor: pointer;
    display: inline-block;
    font-family: var(--c4-font-brand, "sans-serif");
    font-size: 1em;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    padding: var(--c4-size-n4) var(--c4-size-1);
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    user-select: none;
  }

  .left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
    box-shadow: 0 0 0 var(--c4-border-thick) var(--c4-color-focus);
  }

  .secondary,
  .tertiary {
    background-color: transparent;
    color: var(--c4-color-brand);
  }

  .secondary {
    border-color: var(--c4-color-secondary-button-border, #3d84f5);
  }

  .tertiary {
    border-color: transparent;
  }

  .stretch {
    width: 100%;
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