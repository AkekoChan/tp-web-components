class DeleteCompletedTodo extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <style>
        /* Styles spécifiques au composant */
         button {
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
        <button id="deleteBtn">Supprimer les tâches complétées</button>
    `;
  }

  connectedCallback() {
    // this.$test = this.shadowRoot.querySelector("#deleteBtn");
    // console.log(this.$test);
  }
}

customElements.define("delete-completed-todo", DeleteCompletedTodo);
