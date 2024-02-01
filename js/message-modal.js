class Message extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    document.addEventListener('success', event => {
      this.showMessage(event.detail.message);
    });

    document.addEventListener('defeat', event => {
      this.showMessage(event.detail.message);
    });
  }

  showMessage(message) {
    const modal = this.shadow.querySelector('.modal');
    const modalContent = this.shadow.querySelector('.modal-content p');
    modalContent.textContent = message;
    modal.style.display = 'flex';
  }

  render() {
    this.shadow.innerHTML = /*html*/`
      <style>
        .modal {
          background-color: rgba(0,0,0,0.4);
          justify-content:end;
          position: fixed;
          overflow: auto;
          align-items:end;
          display: none;
          height: 100%;
          width: 100%;
          z-index: 5;
          left: 0;
          top: 0;
        }

        .modal-content {
          background-color: #fefefe;
          justify-content:center;
          border: 1px solid #888;
          border-radius:1rem;
          align-items:center;
          margin: 5% auto;
          font-size:40px;
          padding: 20px;
          display:flex;
          width: 40%;
          z-index:4;
        }
      </style>

      <div class="modal" id="modal">
        <div class="modal-content">
          <p></p>
        </div>
      </div>`;

    const closeModal = () => {
      this.shadow.querySelector('.modal').style.display = 'none';
    };

    const openModal = () => {
      this.shadow.querySelector('.modal').style.display = 'flex';
    };

    this.shadow.querySelector('.modal').addEventListener('click', closeModal);
    this.addEventListener('click', openModal);
  }
}

customElements.define('message-component', Message);
