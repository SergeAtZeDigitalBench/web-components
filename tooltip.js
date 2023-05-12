class Tooltip extends HTMLElement {
  #tooltipContainer;
  #tooltipText;

  constructor() {
    super();
    this.#tooltipText = "Some default text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          color: white;
          background-color: black;
          position: absolute;
          z-index: 10;
        }
      </style>
      <slot>Default text</slot>
      <span>(?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this.#tooltipText = this.getAttribute("text");
    }

    this.addEventListener("mouseenter", this.#showTooltip);
    this.addEventListener("mouseleave", this.#hideTooltip);
    this.style.position = "relative";
  }

  disconnectedCallback() {
    this.removeEventListener("mouseenter", this.#showTooltip);
    this.removeEventListener("mouseleave", this.#hideTooltip);
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
