class CustomDetails extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="styles/blocs/custom-details.css" />
    `;
    const template = document.getElementById("custom-details").content;
    this.shadowRoot.appendChild(template.cloneNode(true));

    this.$details = this.shadowRoot.querySelector("details");

    this.$details.addEventListener("mouseenter", this.openDetails);
    this.$details.addEventListener("mouseleave", this.closeDetails);
    this.$details.addEventListener("focusin", this.openDetails);
    this.$details.addEventListener("focusout", this.closeDetails);
    this.$details.addEventListener("keyup", this.escapeDetails);
  }

  closeDetails() {
    this.removeAttribute("open");
  }

  openDetails() {
    this.setAttribute("open", "");
  }

  escapeDetails(ev) {
    if (ev.key === "Escape") {
      this.removeAttribute("open");
    }
  }
}

window.customElements.define("custom-details", CustomDetails);
