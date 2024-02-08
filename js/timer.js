class Timer extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.time = 0;
      this.intervalId = null;
    }

    connectedCallback() {
      this.render();
      this.startTimer();
    }

    disconnectedCallback() {
      this.stopTimer();
    }

    render() {
      this.shadow.innerHTML = /*html*/`
        <style>
          .timer {
            font-size: 24px;
            font-family: Arial, sans-serif;
            background-color:grey;
            color:white;
            padding:2rem;
            display:flex;
            justify-content:center;
            align-items:center;
            border-radius:1rem;
            width:13rem;
            height:4rem;
            font-size:80px;
          }
        </style>
      
        <div class="timer">0:00</div>
      `;

      this.timerDisplay = this.shadow.querySelector('.timer');
    }

    startTimer() {
      this.intervalId = setInterval(() => {
        this.time += 1;
        this.updateTimeDisplay();
      }, 1000);
    }

    stopTimer() {
      clearInterval(this.intervalId);
    }

    updateTimeDisplay() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
      this.timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

customElements.define('timer-component', Timer);
