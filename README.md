# Get It Done 💪🏽 — Full-Stack To-Do App

A full-stack To-Do application with a vanilla JavaScript frontend and a Node.js + Express backend connected to MongoDB Atlas for persistent storage.

---

## 🗂️ Project Structure

```
Javascript-Practice-Projects/
├── To-Do Frontend/
│   ├── index.html       # App UI
│   ├── style.css        # Styles
│   └── script.js        # Frontend logic & API calls
│
└── To-Do Backend/
    ├── server.js        # Express server with Mongoose CRUD routes
    ├── package.json     # Dependencies
    ├── .env             # Environment variables (not pushed to GitHub)
    └── .env.example     # Template for environment variables
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** — App structure
- **CSS3** — Styling
- **Vanilla JavaScript** — DOM manipulation & Fetch API for backend communication

### Backend
- **Node.js** — JavaScript runtime
- **Express.js v5** — REST API framework
- **Mongoose** — MongoDB ODM for schema modeling & queries
- **MongoDB Atlas** — Cloud-hosted NoSQL database
- **dotenv** — Environment variable management
- **CORS** — Cross-origin request handling
- **Nodemon** — Auto-restarting dev server

---

## 🚀 How to Run the App

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a cluster set up

---

### 1. Clone the Repository

```bash
git clone https://github.com/nikfury27/Javascript-Practice-Projects.git
cd Javascript-Practice-Projects
```

---

### 2. Set Up the Backend

```bash
cd "To-Do Backend"
npm install
```

Create a `.env` file in the `To-Do Backend` folder (use `.env.example` as a reference):

```bash
cp .env.example .env
```

Open `.env` and add your MongoDB Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<AppName>
```

Start the backend server with Nodemon:

```bash
npx nodemon server.js
```

The server will start at **http://localhost:5000**

---

### 3. Run the Frontend

Open `To-Do Frontend/index.html` directly in your browser — no build step required.

> ⚠️ Make sure the backend is running on port 5000 before opening the frontend.

---

## 📡 API Endpoints

| Method | Endpoint         | Description            | Body                         |
|--------|-----------------|------------------------|------------------------------|
| GET    | `/todos`         | Fetch all todos        | —                            |
| POST   | `/todos`         | Add a new todo         | `{ "task": "your task" }`    |
| PUT    | `/todos/update`  | Update an existing todo| `{ "key": "<id>", "task": "new task" }` |
| DELETE | `/todos/deleted` | Delete a todo          | `{ "key": "<id>" }`          |

---

## ⚙️ How It Was Built

### Step 1 — Frontend (Static UI)
Started with a basic HTML structure with an input field, an "Add Task" button, and a `<ul>` list to display todos. Styled with CSS and wrote vanilla JS to handle DOM events.

### Step 2 — Basic Backend (In-Memory)
Built an Express REST API with CRUD routes. Initially stored todos in a JavaScript array (`let todos = []`) in memory — fast for prototyping but data was lost on every server restart.

### Step 3 — Connecting Frontend to Backend
Updated `script.js` to use the **Fetch API** to communicate with the backend instead of directly manipulating the DOM array. All add, update, and delete operations now go through the REST API.

### Step 4 — MongoDB Integration
Replaced the in-memory array with **MongoDB Atlas** via **Mongoose**:
- Defined a `Todo` schema with a `task` field
- Replaced all array operations with async Mongoose queries (`find`, `save`, `findByIdAndUpdate`, `findByIdAndDelete`)
- Added `dotenv` to load the `MONGO_URI` from a `.env` file instead of hardcoding it

### Step 5 — Security & Git
- Stored the MongoDB connection string in `.env`
- Added `.env` to `.gitignore` to prevent credentials from being pushed
- Created `.env.example` as a safe template for collaborators

---

## 🔐 Environment Variables

| Variable    | Description                        |
|-------------|------------------------------------|
| `MONGO_URI` | Your MongoDB Atlas connection string |

---

## 📸 Features

- ✅ Add new tasks
- ✅ View all tasks (loaded from database on startup)
- ✅ Update existing tasks inline
- ✅ Delete tasks
- ✅ Persistent storage via MongoDB Atlas
- ✅ Press **Enter** to add or save tasks

---

## 📜 License

This project is for learning purposes. Feel free to fork and build on it!
