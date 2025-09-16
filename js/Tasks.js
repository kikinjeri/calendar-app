export default class Tasks {
  constructor() {
    this.el = document.getElementById("tasks");
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Ensure tasks are stored as plain strings only
    this.tasks = this.tasks.map(t => typeof t === "string" ? t : t.text || "");
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  render(lang) {
    this.el.innerHTML = `
      <h2>Tasks</h2>
      <ul>
        ${this.tasks.map((task, index) => `
          <li>
            <span>${task}</span>
            <button class="edit-task" data-index="${index}">✏️</button>
            <button class="delete-task" data-index="${index}">❌</button>
          </li>
        `).join("")}
      </ul>
      <input id="task-input" placeholder="New task">
      <button id="add-task">Add</button>
    `;

    const input = this.el.querySelector("#task-input");
    this.el.querySelector("#add-task").onclick = () => {
      if (input.value.trim()) {
        this.tasks.push(input.value.trim());
        this.save();
        this.render(lang);
      }
    };

    this.el.querySelectorAll(".delete-task").forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.index;
        this.tasks.splice(i, 1);
        this.save();
        this.render(lang);
      };
    });

    this.el.querySelectorAll(".edit-task").forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.index;
        const newTask = prompt("Edit task:", this.tasks[i]);
        if (newTask !== null && newTask.trim() !== "") {
          this.tasks[i] = newTask.trim();
          this.save();
          this.render(lang);
        }
      };
    });
  }
}
