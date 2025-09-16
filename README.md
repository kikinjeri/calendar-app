# 📅 Smart Calendar App

A modern, responsive calendar app with weather simulation, to-do list, and contact manager.  
Supports **English, French, and Swahili** with full multilingual support.  

### ✨ Features
- 📆 Calendar with responsive grid and today highlight  
- 🌦️ Simulated weather forecast (changes by date)  
- 📝 To-do list with date-linked tasks  
- 📇 Contact manager  
- 🌍 Language switcher (English, Français, Kiswahili)  
- 🌙 Dark mode toggle with localStorage persistence  
- 💾 Data saved in `localStorage` (tasks, contacts, preferences)  
- 📱 Fully responsive and user-friendly design  

### 🛠️ Tech Stack
- HTML5, CSS3 (responsive + dark mode with CSS variables)  
- Vanilla JavaScript (ES6+ classes and modules)  
- LocalStorage for persistence  

### 📂 Project Structure
```
calendar-app/
│── index.html
│── style.css
│── js/
    │── App.js
    │── Calendar.js
    │── Contacts.js
    │── Tasks.js
    │── Weather.js
    │── Translations.js
│── README.md
```

### 🚀 How to Run
1. Clone/download the repo  
2. Open `index.html` in your browser  
3. No server setup required (works offline)  

---

## ✅ Summary of Changes
- Refactored original code into **modular ES6 classes** (`Calendar`, `Weather`, `Tasks`, `Contacts`, `App`).  
- Added **translations module** with English, French, and Swahili.  
- Fixed **"Add Task"** and **"Add Contact"** buttons (now work correctly with localStorage).  
- Added **localStorage persistence** for tasks, contacts, language, and dark mode.  
- Created a **responsive calendar grid** with Swahili weekdays correctly displayed.  
- Added **dark mode toggle** with CSS variables.  
- Improved **UI/UX for professional look** (employer-friendly).  
- Created **README.md** for project documentation.  
