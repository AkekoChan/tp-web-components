class TodoList extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const template = document.getElementById("todo-list").content;
    this.shadowRoot.appendChild(template.cloneNode(true));
  }
}

window.customElements.define("todo-list", TodoList);
