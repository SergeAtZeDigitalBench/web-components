class ToggleText extends HTMLElement {
  #slotText;

  /**
   * @type {HTMLButtonElement | null}
   */
  #button = null;

  /**
   * @type {HTMLDivElement | null}
   */
  #container = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#slotText = "Default text";

    this.shadowRoot.innerHTML = `
        <style>
            .hidden {
                display: none;
            }
        </style>
        <button></button>
        <div>
            <slot>
                ${this.#slotText}
            </slot>
        </div>
    `;
  }

  connectedCallback() {
    this.#button = this.shadowRoot.querySelector("button");
    this.#container = this.shadowRoot.querySelector("div");
    const isHidden = this.hasAttribute("isHidden");

    this.#button.textContent = isHidden ? "Show" : "Hide";
    isHidden && this.#container.classList.add("hidden");

    this.#button.addEventListener("click", this.#toggle);
  }

  disconnectedCallback() {
    this.#button.removeEventListener("click", this.#toggle);
  }

  #toggle = (event) => {
    if (this.#container.classList.contains("hidden")) {
      this.#container.classList.remove("hidden");
      this.#button.textContent = "Hide";
    } else {
      this.#container.classList.add("hidden");
      this.#button.textContent = "Show";
    }
  };
}

customElements.define("sb-tooggle-text", ToggleText);
