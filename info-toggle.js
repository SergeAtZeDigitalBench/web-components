class InfoToggle extends HTMLElement {
  #isVisible;
  #toggleButton;
  #infoBox;

  constructor() {
    super();
    this.#isVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            #info-box {
                display: none;
            }
        </style>
        <button>Show</button>
        <p id="info-box">
            <slot></slot>
        </p>
    `;
    this.#toggleButton = this.shadowRoot.querySelector("button");
    this.#infoBox = this.shadowRoot.querySelector("p");
    this.#toggleButton.addEventListener("click", this.#toggleInfoBox);
  }

  #toggleInfoBox = () => {
    this.#isVisible = !this.#isVisible;
    this.#infoBox.style.display = this.#isVisible ? "block" : "none";
    this.#toggleButton.textContent = this.#isVisible ? "Hide" : "Show";
  };
}

customElements.define("sb-info-toggle", InfoToggle);
