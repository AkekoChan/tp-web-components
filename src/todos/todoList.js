class TodoList extends HTMLElement {
  constructor() {
    super();

    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `

    <style>
    #list-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    </style>
    <add-todo></add-todo>
    <ul id="list-container"></ul>
    <delete-completed-todo></delete-completed-todo>
    `;
  }

  connectedCallback() {
    this.$addTodo = this.shadowRoot.querySelector("add-todo");
    this.$listContainer = this.shadowRoot.querySelector("#list-container");
    this.$editInput = this.shadowRoot.querySelector(".editText");
    this.$addTodo.addEventListener("onSubmit", this.addItem.bind(this));
    this.$deleteCompletedBtn = this.shadowRoot.querySelector("#deleteBtn");
    this.$deleteCompletedBtn.addEventListener("click", () => {
      this.removeCompletedTasks();
    });

    this.render();
  }

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addItem(e) {
    this.tasks.push({ text: e.detail, checked: false });
    this.render();
    this.saveTasksToLocalStorage();
  }

  removeItem(e) {
    this.tasks.splice(e.detail, 1);
    this.render();
    this.saveTasksToLocalStorage();
  }

  toggleItem(e) {
    this.tasks[e.detail] = Object.assign({}, this.tasks[e.detail], {
      checked: !this.tasks[e.detail].checked,
    });
    this.render();
    this.saveTasksToLocalStorage();
  }

  editItem(e) {
    this.tasks[e.detail.index].text = e.detail.newText;
    this.render();
    this.saveTasksToLocalStorage();
  }

  removeCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.checked);
    this.render();
    this.saveTasksToLocalStorage();
  }

  render() {
    if (!this.$listContainer) {
      return;
    }
    // empty the list
    this.$listContainer.innerHTML = "";
    this.tasks.forEach((item, index) => {
      let $item = document.createElement("todo-item");

      $item.setAttribute("text", item.text);
      $item.index = index;
      $item.checked = item.checked;
      $item.addEventListener("onToggle", this.toggleItem.bind(this));
      $item.addEventListener("onRemove", this.removeItem.bind(this));
      $item.addEventListener("onSaveEdit", this.editItem.bind(this));
      this.$listContainer.appendChild($item);
    });
    this.saveTasksToLocalStorage();
  }
}

window.customElements.define("todo-list", TodoList);
