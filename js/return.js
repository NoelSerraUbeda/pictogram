class Return extends HTMLElement {
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
            width:6rem;
            border:none;
            background:none;
            position:absolute;
            z-index:999;
            top:0.5rem;
            left:0.5rem;
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>refresh</title><path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" /></svg>            
      </button>`;
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

customElements.define('return-component', Return);

