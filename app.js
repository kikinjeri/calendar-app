document.addEventListener("DOMContentLoaded", () => {
  window.appState = { lang:"en", isCelsius:true, todoTasks:[], contacts:[] };

  const labels = {
    en: { appTitle:"Productivity Dashboard", todo:"To-Do List", contacts:"Contacts", weather:"Weather", todoPlaceholder:"New task...", contactPlaceholder:"New contact...", prevMonth:"Previous Month", nextMonth:"Next Month", darkMode:"Toggle Dark/Light Mode", celsiusFahrenheit:"°C / °F", enFr:"EN / FR", weatherLocation:"Ottawa, Ontario" },
    fr: { appTitle:"Tableau de Productivité", todo:"Liste de tâches", contacts:"Contacts", weather:"Météo", todoPlaceholder:"Nouvelle tâche...", contactPlaceholder:"Nouveau contact...", prevMonth:"Mois Précédent", nextMonth:"Mois Suivant", darkMode:"Basculer Mode Sombre/Clair", celsiusFahrenheit:"°C / °F", enFr:"EN / FR", weatherLocation:"Ottawa, Ontario" }
  };

  function updateLanguageUI(){
    const l = labels[window.appState.lang];
    document.getElementById("app-title").textContent = l.appTitle;
    document.getElementById("todo-title").textContent = l.todo;
    document.getElementById("contacts-title").textContent = l.contacts;
    document.getElementById("weather-title").textContent = l.weather;
    document.getElementById("todo-input").placeholder = l.todoPlaceholder;
    document.getElementById("contact-input").placeholder = l.contactPlaceholder;
    document.getElementById("prev-month").title = l.prevMonth;
    document.getElementById("next-month").title = l.nextMonth;
    document.getElementById("toggle-mode").title = l.darkMode;
    document.getElementById("toggle-unit").title = l.celsiusFahrenheit;
    document.getElementById("toggle-lang").textContent = l.enFr;
    window.renderCalendar();
  }

  document.getElementById("toggle-lang").addEventListener("click", ()=>{
    window.appState.lang = window.appState.lang==="en"?"fr":"en";
    updateLanguageUI();
  });
  updateLanguageUI();

  document.getElementById("toggle-mode").addEventListener("click", ()=>document.body.classList.toggle("dark-mode"));

  async function updateWeather(){
    document.getElementById("weather-date").textContent = new Date().toDateString();
    try{
      const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=45.4215&longitude=-75.6972&current_weather=true");
      const data = await res.json();
      const tempC = data.current_weather.temperature;
      const temp = window.appState.isCelsius ? tempC : (tempC*9/5+32);
      const unit = window.appState.isCelsius?"°C":"°F";
      document.getElementById("weather-temp").textContent = `Temperature: ${temp.toFixed(1)}${unit}`;
      document.getElementById("weather-desc").textContent = `Windspeed: ${data.current_weather.windspeed} km/h`;
    } catch { document.getElementById("weather-temp").textContent="Unable to load weather";}
  }
  updateWeather();
  document.getElementById("toggle-unit").addEventListener("click", ()=>{
    window.appState.isCelsius=!window.appState.isCelsius;
    updateWeather();
  });

  document.getElementById("add-todo").addEventListener("click", ()=>{
    const input=document.getElementById("todo-input");
    if(!input.value.trim()) return;
    const li=document.createElement("li");
    li.innerHTML=`<span contenteditable="true">${input.value}</span>`;
    document.getElementById("todo-list").appendChild(li);
    input.value="";
  });

  document.getElementById("add-contact").addEventListener("click", ()=>{
    const input=document.getElementById("contact-input");
    if(!input.value.trim()) return;
    const li=document.createElement("li");
    li.innerHTML=`<span contenteditable="true">${input.value}</span>`;
    document.getElementById("contact-list").appendChild(li);
    input.value="";
  });
});
