// ======= Dark/Light Mode =======
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  modeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

// ======= Weather =======
const weatherTemp = document.getElementById("weather-temp");
const weatherDesc = document.getElementById("weather-desc");
const cityNameEl = document.getElementById("cityName");
const forecastEl = document.getElementById("forecast");
const unitToggle = document.getElementById("unitToggle");
let tempUnit = "C"; // default

unitToggle.addEventListener("click", () => {
  tempUnit = tempUnit === "C" ? "F" : "C";
  unitToggle.textContent = `Switch to ${tempUnit === "C" ? "°F" : "°C"}`;
  fetchWeather();
});

// API key
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

// Detect location
navigator.geolocation.getCurrentPosition(pos => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  fetchWeather(lat, lon);
}, () => {
  alert("Location access denied. Using default city.");
  fetchWeather();
});

// Fetch weather
async function fetchWeather(lat=40.7128, lon=-74.0060) { // Default: NYC
  // Current Weather
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  const data = await res.json();
  cityNameEl.textContent = data.name;
  let temp = data.main.temp;
  if (tempUnit === "F") temp = (temp*9/5)+32;
  weatherTemp.textContent = `${temp.toFixed(1)}°${tempUnit}`;
  weatherDesc.textContent = data.weather[0].description;

  // Forecast (5-day, every 12h step)
  const resF = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  const dataF = await resF.json();
  renderForecast(dataF.list);
}

// Render 5-day forecast
function renderForecast(list) {
  forecastEl.innerHTML = "";
  for(let i=0; i<list.length; i+=8){ // every 8th item ~24h
    let temp = list[i].main.temp;
    if(tempUnit==="F") temp=(temp*9/5)+32;
    const card = document.createElement("div");
    card.className="day-card";
    const date = new Date(list[i].dt*1000);
    card.innerHTML = `<strong>${date.toLocaleDateString(undefined,{weekday:'short'})}</strong><br>${temp.toFixed(1)}°${tempUnit}<br>${list[i].weather[0].main}`;
    forecastEl.appendChild(card);
  }
}

// ======= Local Time =======
const timeEl = document.getElementById("currentTime");
function updateTime(){
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString();
}
setInterval(updateTime,1000);
updateTime();
