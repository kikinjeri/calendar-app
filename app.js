document.addEventListener("DOMContentLoaded", () => {
  // Dark / Light mode
  document.getElementById("toggle-mode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Celsius / Fahrenheit toggle
  let isCelsius = true;
  document.getElementById("toggle-unit").addEventListener("click", () => {
    isCelsius = !isCelsius;
    updateWeather();
  });

  // Weather (Ottawa)
  async function updateWeather() {
    const date = new Date();
    document.getElementById("weather-date").textContent = date.toDateString();

    try {
      const lat = 45.4215;
      const lon = -75.6972;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      if (!res.ok) throw new Error("Weather API error");

      const data = await res.json();
      const tempC = data.current_weather.temperature;
      const temp = isCelsius ? tempC : (tempC * 9/5 + 32);
      const unit = isCelsius ? "°C" : "°F";

      document.getElementById("weather-temp").textContent = `Temperature: ${temp.toFixed(1)}${unit}`;
      document.getElementById("weather-desc").textContent =
        `Windspeed: ${data.current_weather.windspeed} km/h`;

      const code = data.current_weather.weathercode;
      let icon = "sunny.png";
      if (code >= 1 && code <= 3) icon = "partly_cloudy.png";
      if (code >= 45 && code <= 99) icon = "rainy.png";
      document.getElementById("weather-icon").src = icon;
    } catch (err) {
      document.getElementById("weather-temp").textContent = "Unable to load weather.";
      console.error(err);
    }
  }
  updateWeather();

  // To-Do
  const todoList = document.getElementById("todo-list");
  document.getElementById("add-todo").addEventListener("click", () => {
    const input = document.getElementById("todo-input");
    if (input.value.trim() !== "") {
      const li = document.createElement("li");
      li.innerHTML = `<i class="bi bi-square"></i> <span contenteditable="true">${input.value}</span>`;
      todoList.appendChild(li);
      input.value = "";
    }
  });

  // Contacts
  const contactList = document.getElementById("contact-list");
  document.getElementById("add-contact").addEventListener("click", () => {
    const input = document.getElementById("contact-input");
    if (input.value.trim() !== "") {
      const li = document.createElement("li");
      li.innerHTML = `<img src="avatar.png" alt="Avatar"> <span contenteditable="true">${input.value}</span>`;
      contactList.appendChild(li);
      input.value = "";
    }
  });
});

