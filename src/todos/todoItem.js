class TodoItem extends HTMLElement {
  constructor() {
    super();

    this.text = "";

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
      .todo-item {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .round label {
        display:flex;
        background-color: #fff;
        border: 1px solid var(--blue);
        border-radius: 50%;
        cursor: pointer;
        height: 28px;
        width: 28px;
        transition: all .25s ease;

        &:hover {
          filter: brightness(0.8);
        }
      }
      
      .round input[type="checkbox"] {
        display: none;
      }
      
      .round input[type="checkbox"]:checked + label {
        background-color: var(--blue);
        border-color: var(--blue);
      }
      
      .text.check {
        text-decoration: line-through;
      }

      .text, .editText {
        color: white;
        font-size: 18px;
      }

      .editText {
        background: none;
        border: none;
        font-family: "Poppins", sans-serif;
        display: none;
      }

      .editText.show-editText {
        display: block;
      }

      .text.show-editText {
        display: none;
      }

      .task-crud {
        margin-left: auto;
        display: flex;
        gap: 12px;
        
        & button {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
          background-color: var(--blue);
          color: #fff;
          font-size: 18px;
          transition: all .25s ease;

          &:hover {
            filter: brightness(0.8);
          }

          & path {
            fill: white;
          }
        }
      }

    </style>
    <li class="todo-item">
        <div class="round">
          <input class="checkbox" type="checkbox" id="checkbox" />
          <label for="checkbox" tabindex="0" aria-label="Tâche réalisée"></label>
        </div>
        <span class="text">Tache 1</span>
        <input class="editText" type="text"/>
        <div class="task-crud">
          <button class="removeBtn" aria-label="Suppresion de tâche"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
          <button class="editBtn" aria-label="Modification de tâche"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
        </div> 
    </li>
    `;
  }

  connectedCallback() {
    this.$text = this.shadowRoot.querySelector(".text");
    this.$remove = this.shadowRoot.querySelector(".removeBtn");
    this.$checkbox = this.shadowRoot.querySelector(".checkbox");
    this.$edit = this.shadowRoot.querySelector(".editBtn");
    this.$editInput = this.shadowRoot.querySelector(".editText");

    console.log(this.shadowRoot.querySelector(".editText"));

    this.$checkbox.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("onToggle", {
          detail: this.index,
        })
      );
    });
    this.$remove.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("onRemove", {
          detail: this.index,
        })
      );
    });
    this.$edit.addEventListener("click", (e) => {
      e.preventDefault();
      this.$text.classList.add("show-editText");
      this.$editInput.classList.add("show-editText");
      this.$editInput.value = this.text;
      this.$editInput.focus();
    });
    this.$editInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.saveEdit();
      }
    });

    this.render();
  }

  static get observedAttributes() {
    return ["text"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.text = newValue;
  }

  saveEdit() {
    const newText = this.$editInput.value;
    if (newText !== this.text) {
      this.dispatchEvent(
        new CustomEvent("onSaveEdit", {
          detail: {
            index: this.index,
            newText: newText,
          },
        })
      );
    }

    this.hideEditInput();
  }

  hideEditInput() {
    this.$editInput.classList.remove("show-editText");
    this.$text.classList.remove("show-editText");
  }

  removeCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.checked);
    this.render();
  }

  render() {
    this.$text.textContent = this.text;
    if (this.checked) {
      this.$checkbox.setAttribute("checked", "");
      this.$text.classList.add("check");
    } else {
      this.$checkbox.removeAttribute("checked");
      this.$text.classList.remove("check");
    }
  }
}

customElements.define("todo-item", TodoItem);
