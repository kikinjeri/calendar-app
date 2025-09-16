export default class Translations {
  constructor() {
    this.dict = {
      en: {
        appTitle: "📅 Smart Calendar",
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      },
      fr: {
        appTitle: "📅 Calendrier Intelligent",
        weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
      },
      sw: {
        appTitle: "📅 Kalenda Akili",
        weekdays: ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"]
      }
    };
  }

  t(lang, key) {
    return this.dict[lang][key];
  }
}