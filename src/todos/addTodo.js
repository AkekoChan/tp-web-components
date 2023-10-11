class AddTodo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          /* Styles spécifiques au composant */
          .add-todo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #edeef0;
            border-radius: 30px;
          }
          .add-todo input[type="text"] {
            width: 100%;
            border: none;
            outline: none;
            background-color: transparent;
            padding: 12px;
            font-size: 17px;
            padding-left: 20px;
            font-family: "Poppins", sans-serif;
          }
          .add-todo button {
            border: none;
            cursor: pointer;
            padding: 15px 50px;
            border-radius: 30px;
            background-color: var(--blue);
            color: #fff;
            font-size: 18px;
            transition: all .25s ease;
            font-family: "Poppins", sans-serif;

            &:hover {
              filter: brightness(0.8);
            }
          }
        </style>
        <div class="add-todo">
          <input type="text" id="taskInput" placeholder="Nouvelle tâche">
          <button id="addButton" tabindex="0">Ajouter</button>
        </div>
      `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const addButton = this.shadowRoot.getElementById("addButton");
    const taskInput = this.shadowRoot.getElementById("taskInput");

    addButton.addEventListener("click", () => {
      const task = taskInput.value;
      if (task) {
        // Émet un événement personnalisé pour ajouter la tâche.
        this.dispatchEvent(
          new CustomEvent("add-task", {
            bubbles: true,
            detail: { task },
          })
        );
        taskInput.value = ""; // Efface le champ de saisie après l'ajout.
      }
    });
  }
}

customElements.define("add-todo", AddTodo);
