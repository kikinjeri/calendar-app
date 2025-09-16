import Translations from './Translations.js';

export default class Calendar {
  constructor() {
    this.el = document.getElementById("calendar");
    this.translations = new Translations();
  }

  render(lang) {
    const now = new Date();
    const month = now.toLocaleString(lang, { month: "long" });
    const year = now.getFullYear();

    const weekdays = this.translations.t(lang, "weekdays");
    const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();

    let html = `<h2>${month} ${year}</h2>`;
    html += `<div class="calendar-grid">`;
    weekdays.forEach(d => html += `<div class="calendar-day"><strong>${d}</strong></div>`);

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === now.getDate();
      html += `<div class="calendar-day ${isToday ? "today" : ""}">${i}</div>`;
    }
    html += `</div>`;

    this.el.innerHTML = html;
  }
}