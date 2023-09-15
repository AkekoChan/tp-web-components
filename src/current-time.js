class currentTime extends HTMLElement {
  constructor() {
    super();
    console.log("Constructeur");
  }
  static get observedAttributes() {
    return ["format"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "format") {
      this.format = newVal;
    }

    if (this.$title) {
      this.render();
    }
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="currentTime">
    <p class="currentTime__title"></p>
    <time class="currentTime__time"></time>  
    </div>
    `;

    this.$title = this.querySelector(".currentTime__title");
    this.$time = this.querySelector(".currentTime__time");
    this.updateTime();
    this.render();
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

  render() {
    this.$title.innerHTML =
      this.format === "utc" ? "Heure UTC" : "Heure locale";
  }

  getTime() {
    let date = new Date();
    let time =
      this.format === "utc" ? date.toUTCString() : date.toLocaleString();

    return time;
  }

  updateTime() {
    this.timer = setInterval(() => {
      this.$time.innerHTML = this.getTime();
    }, 1000);
  }
}
customElements.define("current-time", currentTime);
