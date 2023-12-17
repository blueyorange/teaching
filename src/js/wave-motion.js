class WaveMotion extends HTMLElement {
  constructor() {
    super();
    this.numberOfParticles = 9;
    this.widthEl = 800;
    this.wavelength = this.widthEl / 2;
    this.height = 130;
    this.particleRadius = 10;
    this.amplitude = 50;
    this.period = 2;
    this.svg = null;
    this.transverse = false;
    this.longitudinal = false;
    this.animationstate = "play";
  }

  static get observedattributes() {
    return ["transverse", "animationstate"];
  }

  connectedCallback() {
    this.transverse = this.getAttribute("transverse");
    this.longitudinal = this.getAttribute("longitudinal");
    this.animationstate = this.getAttribute("animationstate");
    this.createSVG();
    this.createParticles();
  }

  createSVG() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.svg.setAttribute("viewBox", `0 0 ${this.widthEl} ${this.height}`);
    this.svg.setAttribute("width", "100%");
    this.appendChild(this.svg);
    this.createAxis();
  }

  createAxis() {
    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("stroke", "red");
    axis.setAttribute("x1", "0");
    axis.setAttribute("y1", this.height / 2);
    axis.setAttribute("x2", this.widthEl);
    axis.setAttribute("y2", this.height / 2);
    axis.setAttribute("stroke-width", 2);
    axis.setAttribute("stroke-dasharray", "10 10");
    this.svg.appendChild(axis);
  }

  createParticle(xPos, yPos) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    el.setAttribute("cx", xPos);
    el.setAttribute("cy", this.height / 2);
    el.setAttribute("r", this.particleRadius);
    el.setAttribute("fill", "red");
    el.setAttribute("stroke", "black");
    el.setAttribute("stroke-width", 2);
    this.svg.appendChild(el);

    const k = (2 * Math.PI) / this.wavelength;
    const w = (2 * Math.PI) / (this.period * 1000);

    const animateParticle = (timestamp) => {
      let displacement = this.amplitude * Math.sin(k * xPos - w * timestamp);
      if (this.transverse) {
        el.setAttribute("cy", yPos - displacement);
      }
      if (this.longitudinal) {
        el.setAttribute("cx", xPos + displacement);
      }
      requestAnimationFrame(animateParticle);
    };

    animateParticle(0);
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      const initialXPos =
        ((i + 1) * this.widthEl) / (this.numberOfParticles + 1);
      this.createParticle(initialXPos, this.height / 2);
    }
  }
}

customElements.define("wave-motion", WaveMotion);
