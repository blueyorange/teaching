import {
  LitElement,
  html,
  svg,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class WaveMotion extends LitElement {
  #boundHandleKeyPress;
  static properties = {
    numberOfParticles: { type: Number },
    amplitude: { type: Number },
    frequency: { type: Number },
    velocity: { type: Number },
    state: { type: String },
    type: { type: String },
  };
  a;
  static styles = css`
    #axis {
      stroke-dasharray: 10 10;
      stroke: red;
      stroke-width: 2;
    }
    #marker-circle {
      stroke: black;
      stroke-width: 0;
    }
    .particle {
      stroke: black;
      stroke-width: 3;
      marker-end: url(#marker-circle);
    }
  `;

  constructor() {
    super();
    this.state = "play";
    this.type = "transverse";
    this.numberOfParticles = 25;
    this.viewBoxWidth = 900;
    this.viewBoxHeight = this.getAttribute("height") || 200;
    this.amplitude = 90;
    this.frequency = 0.5;
    this.velocity = 200;
    this.animationFrameId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // Add event listener for keypress
    this.#boundHandleKeyPress = this.handleKeyPress.bind(this);
    window.addEventListener("keypress", this.#boundHandleKeyPress);
  }

  disconnectedCallback() {
    // Clean up event listener when element is removed
    window.removeEventListener("keypress", this.#boundHandleKeyPress);
    super.disconnectedCallback();
  }

  handleKeyPress(e) {
    if (e.code === "r") {
      this.toggleAnimation();
    }
  }

  toggleAnimation() {
    this.state = this.state === "play" ? "pause" : "play";

    if (this.state === "play") {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  xPos(i) {
    return (i * this.viewBoxWidth) / (this.numberOfParticles - 1);
  }

  disp(x, t) {
    const k = (2 * Math.PI * this.frequency) / this.velocity;
    const w = (2 * Math.PI * this.frequency) / 1000;
    return this.amplitude * Math.sin(k * x - w * t);
  }

  updated() {
    this.stopAnimation();
    this.particles = this.shadowRoot.querySelectorAll(".particle");
    this.updatePositions(this.currentTime || 0);
    if (this.state === "play") {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  startAnimation() {
    const animate = (time) => {
      this.currentTime = time;
      this.updatePositions(time);
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate(this.currentTime || 0);
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationFrameId);
  }

  updatePositions(time) {
    for (const particle of this.particles) {
      const x1 = Number(particle.getAttribute("x1"));
      const y1 = particle.getAttribute("y1");
      if (this.type === "transverse") {
        particle.setAttribute(
          "y2",
          this.viewBoxHeight / 2 - this.disp(x1, time)
        );
      } else if (this.type === "longitudinal") {
        particle.setAttribute("x2", x1 + this.disp(x1, time));
      }
    }
  }

  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}"
    >
      <defs>
        <marker
          id="marker-circle"
          viewBox="0 0 20 20"
          refX="10"
          refY="10"
          markerWidth="5"
          markerHeight="5"
        >
          <circle cx="10" cy="10" r="10"></circle>
        </marker>
      </defs>
      <line id="axis" x1="0" y1="50%" x2="100%" y2="50%"></line>
      <g id="particles">
        ${Array.from(
          { length: this.numberOfParticles },
          (_, i) =>
            svg`<line class='particle'
            x1=${this.xPos(i)}
            y1="50%"
            x2=${this.xPos(i)}
            y2="50%"></line>`
        )}
      </g>
    </svg>`;
  }
}

customElements.define("wave-motion", WaveMotion);
