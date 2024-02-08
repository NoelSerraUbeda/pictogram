class Menu extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = /*html*/`
      <style>

        .menu {
          display:flex;
          flex-direction:column;
          gap:5rem;
          margin-left:-1px
        }

        .container-title {
          padding:1rem;
        }

        .container-play {
          padding:1rem;
        }

        button {
          padding: 1.5rem 10rem;
          font-size:64px;
          border-radius:1.5rem;
          border:none;
          cursor:pointer;
          transition: all 0.3s ease-in;
          font-family: "Poppins", sans-serif;
        }

        .play-button button:hover { 
          background-color: #0020a9; 
          color: white; 
          transform:scale(1.1)
        }

        img {
          width:40rem
        }
      </style>

      <div class="menu">
        <div class="container-title">
          <div class="title">
            <img src="./image/title.png" alt="Title">
          </div>
        </div>
        <div class="container-play">
          <div class="play-button">
              <button onclick="window.location.href='./game.html'">Play Game</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('menu-component', Menu);
