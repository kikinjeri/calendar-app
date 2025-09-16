export default class Weather {
  constructor() {
    this.el = document.getElementById("weather");
  }

  render(lang) {
    const date = new Date();
    const conditions = ["☀️", "🌧️", "⛅", "❄️"];
    const random = conditions[date.getDate() % conditions.length];
    this.el.innerHTML = `<h2>Weather</h2><p>${date.toDateString()}</p><p>${random} 20°C</p>`;
  }
}