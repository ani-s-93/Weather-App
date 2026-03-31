# 🌤️ AI Weather App

A full-stack weather application with real-time weather data and an AI-powered assistant that gives personalized recommendations and answers natural language questions.

🔗 **Live Demo:** https://weather-app-tan-eight-40.vercel.app/

---

## 📸 Preview

<img width="938" height="669" alt="image" src="https://github.com/user-attachments/assets/92cc0d91-7d28-4ec6-bfae-06c5b9c480bb" />

<img width="935" height="879" alt="image" src="https://github.com/user-attachments/assets/ab6db829-fdbf-41d9-b483-bc84696376cc" />

---

## ✨ Features

* 🔍 Search real-time weather by city name
* 🌡️ Temperature, humidity and wind speed data
* 🤖 AI-generated outfit, health and activity recommendations
* 💬 Natural language Q&A — ask things like *"Can I play football today?"*
* 🎨 Glassmorphism UI with smooth animations
* ⚡ Fast and responsive design

---

## 🛠️ Tech Stack

### Frontend
* React + Vite
* CSS (Glassmorphism styling)
* OpenWeatherMap API

### Backend
* Node.js + Express
* Groq API (LLaMA 3.1) for AI responses

### Deployment
* Frontend → Vercel
* Backend → Render

---

## 📂 Project Structure
```
weather-app/
│── backend/
│   ├── server.js
│   └── package.json
│── src/
│   ├── components/
│   │   ├── Weather.jsx
│   │   └── Weather.css
│   ├── assets/
│   └── App.jsx
│── public/
│── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/ani-s-93/Weather-App.git
cd Weather-App
```

### 2. Setup Frontend
```bash
npm install
```
Create a `.env` file in the root:
```
VITE_APP_ID=your_openweathermap_api_key
```

### 3. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in `/backend`:
```
GROQ_API_KEY=your_groq_api_key
```

### 4. Run locally
```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
npm run dev
```

---

## 📌 Future Improvements

* 📍 Auto-detect location on load
* 🌙 Dark/Light mode toggle
* 📊 5-day forecast with AI summary
* 🎤 Voice input for AI questions
* 📱 PWA support for mobile installation

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and create a pull request.

---

## ⭐ Show your support

If you like this project, give it a star ⭐ on GitHub!

---

## 📬 Contact

Created by Anika Sharma
Feel free to connect!
