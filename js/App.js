import Calendar from './Calendar.js';
import Weather from './Weather.js';
import Tasks from './Tasks.js';
import Contacts from './Contacts.js';
import Translations from './Translations.js';

class App {
  constructor() {
    this.languageSelect = document.getElementById("language");
    this.darkToggle = document.getElementById("dark-mode-toggle");

    this.calendar = new Calendar();
    this.weather = new Weather();
    this.tasks = new Tasks();
    this.contacts = new Contacts();

    this.translations = new Translations();
    this.lang = localStorage.getItem("lang") || "en";
    this.languageSelect.value = this.lang;
    this.applyTranslations();

    this.darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    if (this.darkMode) document.body.classList.add("dark");

    this.addEventListeners();
  }

  addEventListeners() {
    this.languageSelect.addEventListener("change", () => {
      this.lang = this.languageSelect.value;
      localStorage.setItem("lang", this.lang);
      this.applyTranslations();
    });

    this.darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      this.darkMode = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
    });
  }

  applyTranslations() {
    document.getElementById("app-title").textContent = this.translations.t(this.lang, "appTitle");
    this.calendar.render(this.lang);
    this.weather.render(this.lang);
    this.tasks.render(this.lang);
    this.contacts.render(this.lang);
  }
}

new App();