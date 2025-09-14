document.addEventListener("DOMContentLoaded", () => {
  const monthYearEl = document.getElementById("month-year");
  const calendarEl = document.getElementById("calendar");

  let currentDate = new Date();
  let state = {
    events: JSON.parse(localStorage.getItem("events")) || {}
  };

  function saveState() {
    localStorage.setItem("events", JSON.stringify(state.events));
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    monthYearEl.textContent = `${firstDay.toLocaleString("default", { month: "long" })} ${year}`;
    calendarEl.innerHTML = "";

    // Weekday headers
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const headerRow = document.createElement("div");
    headerRow.className = "weekdays";
    weekdays.forEach(day => {
      const cell = document.createElement("div");
      cell.textContent = day;
      headerRow.appendChild(cell);
    });
    calendarEl.appendChild(headerRow);

    // Days grid
    const daysGrid = document.createElement("div");
    daysGrid.className = "days";

    // Empty slots
    for (let i = 0; i < firstDay.getDay(); i++) {
      const empty = document.createElement("div");
      empty.className = "day empty";
      daysGrid.appendChild(empty);
    }

    // Days of month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const day = document.createElement("div");
      day.className = "day";
      day.innerHTML = `<span>${d}</span>`;

      const dateKey = `${year}-${month + 1}-${d}`;
      if (state.events[dateKey]) {
        state.events[dateKey].forEach(ev => {
          const evEl = document.createElement("span");
          evEl.className = "event";
          day.appendChild(evEl);
        });
      }

      const today = new Date();
      if (
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        day.classList.add("today");
      }

      day.addEventListener("click", () => {
        const task = prompt("Add event for " + dateKey);
        if (task) {
          if (!state.events[dateKey]) state.events[dateKey] = [];
          state.events[dateKey].push(task);
          saveState();
          renderCalendar();
        }
      });

      daysGrid.appendChild(day);
    }

    calendarEl.appendChild(daysGrid);
  }

  document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
  document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});
