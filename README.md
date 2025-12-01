# 🐟 Taiyaki Cards 🧡

A cute and cozy flashcard app to help you study smarter!

<!-- <img src="client/public/taiyaki.png" alt="Taiyaki Cards" width="200"> -->

## 🌐 Live Demo

- **Frontend:** [taiyaki.vercel.app](https://taiyaki.vercel.app)
- **Backend API:** [taiyaki.onrender.com](https://taiyaki.onrender.com)

## ✨ Features

- 🔐 **User Authentication** - Sign up and log in to save your progress
- 📚 **Create & Manage Decks** - Organize your flashcards into custom decks
- 🃏 **Create & Manage Flashcards** - Add, edit, and delete flashcards with ease
- 📖 **Study Mode** - Flip through cards and self-grade your knowledge
- 📝 **Quiz Mode** - Test yourself with multiple choice questions
- 📱 **Responsive Design** - Works great on desktop and mobile

## 🛠️ Tech Stack

**Frontend:**
- React
- React Router
- CSS3 with custom properties
- Vercel (hosting)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Render (hosting)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Local Development

1. **Clone the repository**
```bash
   git clone https://github.com/MonishB123/taiyaki
   cd taiyaki
```

2. **Set up the backend**
```bash
   cd server
   npm install
```
   
   Create a `.env` file in the `server/` folder:
```
   DATABASE_URL=mongodb+srv://your_connection_string
   PORT=5000
```
   
   Start the server:
```bash
   npm run dev
```

3. **Set up the frontend**
```bash
   cd client
   npm install
   npm start
```

4. **Open the app**
   
   Visit [http://localhost:3000](http://localhost:3000)

## 👥 Team

- **Lan Anh Do** - Frontend Developer
- **Eddy Chen** - Frontend Developer
- **Monish Beegamudre** - Backend Developer
- **Benjamin Nguyen** - Backend Developer
