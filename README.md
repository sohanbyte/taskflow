# TaskFlow — Full Stack Task Manager

A full-stack task management app I built as part of an internship assignment.
It uses the MERN stack with JWT authentication and a Kanban-style task board.

**Live Demo:** https://taskflow-alpha-two.vercel.app  
**Backend API:** https://taskflow-server-ove3.onrender.com
---

## Tech Stack

- **Frontend:** React 18 + Vite, React Router v6, Axios, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (cloud-hosted)
- **Auth:** JWT (JSON Web Tokens) + bcryptjs password hashing
- **Deployment:** Frontend → Vercel | Backend → Render

---

## Features

- ✅ Real user authentication (signup / login / logout)
- ✅ JWT-protected API routes
- ✅ Passwords hashed with bcrypt (never stored as plain text)
- ✅ Personal task board — each user sees only their own tasks
- ✅ Create, edit, delete tasks
- ✅ Task priority (Low / Medium / High)
- ✅ Kanban columns: To Do → In Progress → Done
- ✅ One-click status progression
- ✅ Fully responsive (mobile + desktop)

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account 

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev       # runs on http://localhost:5000
```

### 3. Frontend setup
```bash
cd client
npm install
# Create .env file:
echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev       # runs on http://localhost:5173
```

---

## Deployment

### Backend → Render
1. Push to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Root directory: `server`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL)

### Frontend → Vercel
1. Create a new project on [vercel.com](https://vercel.com)
2. Root directory: `client`
3. Add environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, receive JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/tasks` | ✅ | Get all user tasks |
| POST | `/api/tasks` | ✅ | Create a task |
| PUT | `/api/tasks/:id` | ✅ | Update a task |
| DELETE | `/api/tasks/:id` | ✅ | Delete a task |

---

## Project Structure

```
taskflow/
├── server/
│   ├── models/
│   │   ├── User.js          # Mongoose User schema (bcrypt hashing)
│   │   └── Task.js          # Mongoose Task schema
│   ├── routes/
│   │   ├── auth.js          # Signup, login, /me
│   │   └── tasks.js         # CRUD task routes
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── server.js            # Express app entry point
│   └── package.json
└── client/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global auth state
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   ├── App.jsx              # Routes + protected routes
    │   └── main.jsx
    └── package.json
```

---

## Author

Built by **SOHAN KUMAR BEHERA** — TaskFlow Assignment
