window.renderCalendar = function() {
  const calendarEl = document.getElementById("calendar");
  const monthYearEl = document.getElementById("month-year");

  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();

  monthYearEl.textContent = date.toLocaleString(window.appState.lang, { month:"long", year:"numeric" });

  const weekdays = window.appState.lang === "fr" ? ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"] : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  calendarEl.innerHTML = "";
  const headerRow = document.createElement("div");
  headerRow.classList.add("calendar-row","calendar-header");
  weekdays.forEach(d => {
    const cell = document.createElement("div");
    cell.classList.add("calendar-cell","calendar-header-cell");
    cell.textContent = d;
    headerRow.appendChild(cell);
  });
  calendarEl.appendChild(headerRow);

  const firstDay = new Date(y,m,1).getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();
  let row = document.createElement("div");
  row.classList.add("calendar-row");

  for(let i=0;i<firstDay;i++){
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-cell","empty-cell");
    row.appendChild(emptyCell);
  }

  for(let day=1; day<=daysInMonth; day++){
    if(row.children.length===7){ calendarEl.appendChild(row); row=document.createElement("div"); row.classList.add("calendar-row"); }
    const cell = document.createElement("div");
    cell.classList.add("calendar-cell");
    cell.textContent = day;
    const today = new Date();
    if(day===today.getDate() && m===today.getMonth() && y===today.getFullYear()) cell.classList.add("today");
    row.appendChild(cell);
  }

  while(row.children.length<7){
    const emptyCell=document.createElement("div");
    emptyCell.classList.add("calendar-cell","empty-cell");
    row.appendChild(emptyCell);
  }
  calendarEl.appendChild(row);
};
