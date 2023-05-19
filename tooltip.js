class Tooltip extends HTMLElement {
  #tooltipContainer;
  #tooltipText;
  #tooltipIcon;

  constructor() {
    super();
    this.#tooltipText = "Some default text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          color: white;
          background-color: black;
          position: absolute;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
          top: 1.5rem;
          left: 0.75rem;
        }
        :host(.background) {
          background: var(--color-primary, #ccc);
          padding: 0.15rem;
        }
        :host-context(p) {
          background-color: magenta;
          font-weight: bold;
        }
        ::slotted(.highlight) {
          border-bottom: 2px solid red;
        }
        .icon{
          width: 15px;
          height: 15px;
          display: inline-block;
          background: black;
          color: white;
          padding: 0.25rem;
          border-radius: 50%;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <slot>Default text</slot>
      <span class="icon">?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this.#tooltipText = this.getAttribute("text");
    }
    this.#tooltipIcon = this.shadowRoot.querySelector("span.icon");

    this.#tooltipIcon.addEventListener("mouseenter", this.#showTooltip);
    this.#tooltipIcon.addEventListener("mouseleave", this.#hideTooltip);
    this.style.position = "relative";
  }

  disconnectedCallback() {
    this.#tooltipIcon.removeEventListener("mouseenter", this.#showTooltip);
    this.#tooltipIcon.removeEventListener("mouseleave", this.#hideTooltip);
  }

  attributeChangedCallback(name, prevValue, newValue) {
    console.log({ name, prevValue, newValue });
    if (newValue === prevValue) return;
    if (name === "text") {
      this.#tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  #showTooltip = (event) => {
    this.#tooltipContainer = document.createElement("div");
    this.#tooltipContainer.textContent = this.#tooltipText;
    this.shadowRoot.appendChild(this.#tooltipContainer);
  };

  #hideTooltip = (event) => {
    this.shadowRoot.removeChild(this.#tooltipContainer);
  };
}

customElements.define("my-sb-tooltip", Tooltip);
