// --- Translations ---
const translations = {
  en: { calendar:"Calendar", weather:"Weather", todo:"To-Do List", contacts:"Contacts",
        addTask:"Add", addContact:"Add", placeholderTask:"Enter a task...", placeholderContact:"Enter contact name...",
        days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] },
  fr: { calendar:"Calendrier", weather:"Météo", todo:"Liste de tâches", contacts:"Contacts",
        addTask:"Ajouter", addContact:"Ajouter", placeholderTask:"Entrez une tâche...", placeholderContact:"Entrez un nom de contact...",
        days:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"] },
  sw: { calendar:"Kalenda", weather:"Hali ya Hewa", todo:"Orodha ya Kazi", contacts:"Anwani",
        addTask:"Ongeza", addContact:"Ongeza", placeholderTask:"Andika kazi...", placeholderContact:"Andika jina la anwani...",
        days:["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"] }
};

// --- State ---
let currentLang = "en";
let selectedDate = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let tasks = [];
let contacts = [];

// --- DOM ---
const calendarTitle = document.getElementById("calendar-title");
const weatherTitle = document.getElementById("weather-title");
const todoTitle = document.getElementById("todo-title");
const contactsTitle = document.getElementById("contacts-title");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");
const contactInput = document.getElementById("contact-input");
const addContactBtn = document.getElementById("add-contact-btn");
const contactsList = document.getElementById("contacts-list");
const languageSelect = document.getElementById("language-select");
const monthYear = document.getElementById("month-year");
const calendarGrid = document.getElementById("calendar-grid");
const weatherInfo = document.getElementById("weather-info");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

// --- Language ---
function updateLanguage() {
  const t = translations[currentLang];
  calendarTitle.textContent = t.calendar;
  weatherTitle.textContent = t.weather;
  todoTitle.textContent = t.todo;
  contactsTitle.textContent = t.contacts;
  addTaskBtn.textContent = t.addTask;
  addContactBtn.textContent = t.addContact;
  taskInput.placeholder = t.placeholderTask;
  contactInput.placeholder = t.placeholderContact;
}

// --- Calendar ---
function generateCalendar(month=currentMonth, year=currentYear){
  calendarGrid.innerHTML = "";
  const t = translations[currentLang];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month+1, 0).getDate();

  monthYear.textContent = `${new Date(year, month).toLocaleString(currentLang,{month:'long'})} ${year}`;

  // Day names
  t.days.forEach((day,i)=>{
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.style.fontWeight="bold";
    if(i===0||i===6) dayDiv.classList.add("weekend");
    calendarGrid.appendChild(dayDiv);
  });

  // Empty cells
  for(let i=0;i<firstDay;i++) calendarGrid.appendChild(document.createElement("div"));

  const today = new Date();
  for(let i=1;i<=lastDate;i++){
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    const dayIndex = (i+firstDay-1)%7;
    if(dayIndex===0||dayIndex===6) dayDiv.classList.add("weekend");
    if(i===today.getDate() && month===today.getMonth() && year===today.getFullYear()) dayDiv.classList.add("today");
    if(selectedDate && i===selectedDate.getDate() && month===selectedDate.getMonth() && year===selectedDate.getFullYear()) dayDiv.classList.add("selected");

    const dayKey=`${year}-${month+1}-${i}`;
    if(tasks.some(t=>t.date===dayKey)) dayDiv.classList.add("has-task");

    dayDiv.addEventListener("click", ()=>{
      selectedDate=new Date(year, month, i);
      showWeather(i, month, year);
      renderTasks();
      generateCalendar(month, year);
    });

    calendarGrid.appendChild(dayDiv);
  }
}

// --- Weather ---
function showWeather(day, month, year){
  const conditions=["Sunny","Cloudy","Rainy","Stormy","Windy"];
  const colors={Sunny:"#fbc02d",Cloudy:"#90a4ae",Rainy:"#2196f3",Stormy:"#9c27b0",Windy:"#00bcd4"};
  const temp=Math.floor(Math.random()*15+15);
  const condition=conditions[Math.floor(Math.random()*conditions.length)];
  weatherInfo.textContent=`${new Date(year,month,day).toDateString()} — ${temp}°C, ${condition}`;
  weatherInfo.style.color=colors[condition];
}

// --- Tasks ---
addTaskBtn.addEventListener("click",()=>{
  const text=taskInput.value.trim();
  if(!text) return;
  const dayKey = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}` : "general";
  tasks.push({text,date:dayKey});
  taskInput.value="";
  renderTasks();
  generateCalendar();
});

function renderTasks(){
  todoList.innerHTML="";
  const filtered = tasks.filter(t => t.date==="general" || (selectedDate && t.date===`${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`));
  filtered.forEach((t)=>{
    const li=document.createElement("li");
    li.textContent=t.text;
    const del=document.createElement("button");
    del.textContent="✕";
    del.addEventListener("click",()=>{tasks.splice(tasks.indexOf(t),1); renderTasks(); generateCalendar();});
    li.appendChild(del);
    todoList.appendChild(li);
  });
}

// --- Contacts ---
addContactBtn.addEventListener("click",()=>{
  const c=contactInput.value.trim();
  if(!c) return;
  contacts.push(c);
  contactInput.value="";
  renderContacts();
});

function renderContacts(){
  contactsList.innerHTML="";
  contacts.forEach((c,i)=>{
    const li=document.createElement("li");
    li.textContent=c;
    const del=document.createElement("button");
    del.textContent="✕";
    del.addEventListener("click",()=>{contacts.splice(i,1);renderContacts();});
    li.appendChild(del);
    contactsList.appendChild(li);
  });
}

// --- Navigation ---
languageSelect.addEventListener("change",()=>{currentLang=languageSelect.value; updateLanguage(); generateCalendar();});
prevBtn.addEventListener("click",()=>{currentMonth--; if(currentMonth<0){currentMonth=11;currentYear--;} generateCalendar();});
nextBtn.addEventListener("click",()=>{currentMonth++; if(currentMonth>11){currentMonth=0;currentYear++;} generateCalendar();});

// --- Init ---
updateLanguage();
generateCalendar();
