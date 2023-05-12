class Tooltip extends HTMLElement {
  #tooltipContainer;
  #tooltipText;

  constructor() {
    super();
    this.#tooltipText = "Some default text";
  }

  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = ` (?)`;

    if (this.hasAttribute("text")) {
      this.#tooltipText = this.getAttribute("text");
    }

    this.addEventListener("mouseenter", this.#showTooltip);
    this.addEventListener("mouseleave", this.#hideTooltip);
    this.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  disconnectedCallback() {
    this.removeEventListener("mouseenter", this.#showTooltip);
    this.removeEventListener("mouseleave", this.#hideTooltip);
  }

  #showTooltip = (event) => {
    this.#tooltipContainer = document.createElement("div");
    this.#tooltipContainer.textContent = this.#tooltipText;
    this.#tooltipContainer.style.backgroundColor = "black";
    this.#tooltipContainer.style.color = "white";
    this.#tooltipContainer.style.position = "absolute";
    this.#tooltipContainer.style.zIndex = "10";
    this.appendChild(this.#tooltipContainer);
  };

  #hideTooltip = (event) => {
    this.removeChild(this.#tooltipContainer);
  };
}

customElements.define("my-sb-tooltip", Tooltip);
