class ConfirmLink extends HTMLAnchorElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("click", this.#handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.#handleClick);
  }

  #handleClick = (event) => {
    const isConfirmed = confirm("Do you really want to leave this page?");
    if (!isConfirmed) {
      event.preventDefault();
    }
  };
}

customElements.define("sb-confirm-link", ConfirmLink, { extends: "a" });
