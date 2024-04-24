class WaveHarmonics extends HTMLElement {
  #amplitude = 90;
  #mode;
  #length = 1000;
  #frequency = 0.2;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.waveFunc = (x, t) =>
      this.#amplitude *
      Math.sin((this.#mode * Math.PI * x) / this.#length) *
      Math.cos(2 * Math.PI * this.#frequency * this.#mode * t);
    shadow.innerHTML = `
      <style>
        svg {
          width: 100%;
          height: 100%;
          color: black;
        }
      </style>
      <div id="wave-container">
        <svg id="wave" viewBox="0 -100 1000 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="-0" y1="0" x2="1000" y2="0" stroke="black"/>
        <path id="wavePath"/>
        <circle cx="0" cy="0" r="5"/>
        <circle cx="1000" cy="0" r="5"/>
        </svg>
      </div>
    `;
  }

  connectedCallback() {
    this.#mode = Number(this.getAttribute("mode")) || 1;
    console.log(this.#mode);
    this.svg = this.shadowRoot.getElementById("wave");
    this.startAnimation();
  }

  startAnimation() {
    const animate = (time) => {
      this.currentTime = time;
      this.drawWave(time);
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate(this.currentTime || 0);
  }

  drawWave(elapsed) {
    const svg = this.shadowRoot.getElementById("wave");
    const points = [];
    for (let x = 0; x <= 1000; x += 1) {
      const y = this.waveFunc(x, elapsed / 1000);
      points.push(`${x},${y}`);
    }
    const pathEl = this.shadowRoot.getElementById("wavePath");
    pathEl.setAttribute("d", `M${points.join("L")}`);
    pathEl.setAttribute("stroke", "black");
    pathEl.setAttribute("fill", "none");
    pathEl.setAttribute("stroke-width", "3");
  }
}

customElements.define("wave-harmonics", WaveHarmonics);
