export default class Contacts {
  constructor() {
    this.el = document.getElementById("contacts");
    this.contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    // Ensure contacts are plain strings
    this.contacts = this.contacts.map(c => typeof c === "string" ? c : c.name || "");
  }

  save() {
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
  }

  render(lang) {
    this.el.innerHTML = `
      <h2>Contacts</h2>
      <ul>
        ${this.contacts.map((contact, index) => `
          <li>
            <span>${contact}</span>
            <button class="edit-contact" data-index="${index}">✏️</button>
            <button class="delete-contact" data-index="${index}">❌</button>
          </li>
        `).join("")}
      </ul>
      <input id="contact-input" placeholder="New contact">
      <button id="add-contact">Add</button>
    `;

    const input = this.el.querySelector("#contact-input");
    this.el.querySelector("#add-contact").onclick = () => {
      if (input.value.trim()) {
        this.contacts.push(input.value.trim());
        this.save();
        this.render(lang);
      }
    };

    this.el.querySelectorAll(".delete-contact").forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.index;
        this.contacts.splice(i, 1);
        this.save();
        this.render(lang);
      };
    });

    this.el.querySelectorAll(".edit-contact").forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.index;
        const newContact = prompt("Edit contact:", this.contacts[i]);
        if (newContact !== null && newContact.trim() !== "") {
          this.contacts[i] = newContact.trim();
          this.save();
          this.render(lang);
        }
      };
    });
  }
}

