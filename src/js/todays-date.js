class todaysDate extends HTMLElement {
    connectedCallback() {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
       this.innerHTML = new Date().toLocaleDateString(undefined, options);
   }
}

customElements.define('todays-date', todaysDate);