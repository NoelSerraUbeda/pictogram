class Reload extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.shadow.innerHTML = /*html*/`
      <style>
        button {
          padding: 1rem 2rem;
          border:none;
          background:none;
          z-index:999;
          background-color:grey;
          cursor:pointer;
          border-radius:1rem;
          color:white;
          font-size:20px;
        }

        button svg{
          fill:white;
          cursor:pointer;
          transition: transform 0.3s;
        }

        button svg:hover{
          transform:scale(1.1)
        }
      </style>
    
      <button id="returnButton">
        <h2>New Game >>></h2>
      </button>
    `;
  }

  attachEventListeners() {
    const returnButton = this.shadow.getElementById('returnButton');
    returnButton.addEventListener('click', () => {
      this.goBack();
    });
  }

  goBack() {
    location.reload();
  }
}

customElements.define('reload-component', Reload);

