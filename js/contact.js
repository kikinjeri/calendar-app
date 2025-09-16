export default class Contacts {
  constructor(app) {
    this.app = app;
    this.input = document.getElementById("contact-input");
    this.addBtn = document.getElementById("add-contact");
    this.list = document.getElementById("contacts-list");
    this.addBtn.addEventListener("click", () => this.add());
  }

  add() {
    const text = this.input.value.trim();
    if (!text) return;
    this.app.contactsData.push(text);
    this.app.saveData();
    this.input.value = "";
    this.render();
  }

  render() {
    this.list.innerHTML = "";
    this.app.contactsData.forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      const delBtn = document.createElement("button");
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => {
        this.app.contactsData = this.app.contactsData.filter(x => x !== c);
        this.app.saveData();
        this.render();
      });
      li.appendChild(delBtn);
      this.list.appendChild(li);
    });
  }
}
