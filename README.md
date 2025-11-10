🗨️ Comment System — MERN Stack

A full-stack Comment System built using MongoDB, Express.js, React, and Node.js (MERN).
It includes authentication, CRUD operations, like/dislike, sorting, pagination.
All APIs are protected and validated using JWT and Zod for schema validation.

🚀 Features
🔐 Authentication

JWT-based login/register

Password validation (min 6 chars, valid email check)

💬 Comment System

Add, edit, delete comments

Like/dislike (only once per user)

Sort by: Newest, Most Liked, Most Disliked

Pagination for performance

Only comment owner can edit/delete


🎨 Frontend

Built with React + Tailwind CSS

Modern responsive UI

Protected routes via React Router

Context API for auth & comments state management

🛠️ Installation Guide
📦 Prerequisites

Make sure you have:

Node.js ≥ 18

npm or yarn

MongoDB Atlas account (or local MongoDB instance)

🧱 Clone 

```
git clone https://github.com/Arefin6/CommentSystem
```

🧱 Backend Setup

1️⃣ Navigate to backend folder

```
cd  backend
```
2️⃣ Install dependencies

```
npm  install
```


3️⃣ Create .env file
```
touch .env
```
4️⃣ Add the following variables
```
# Server
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/comments

# JWT Secret
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN = 7d
```
5️⃣ Run the server
```
npm run dev
```
The backend runs by default on http://localhost:5000

💻 Frontend Setup

1️⃣ Navigate to frontend folder
```
cd frontend
```
2️⃣ Install dependencies
```
npm install
```
3️⃣ Create .env file
```
touch .env
```
4️⃣ Add environment variables
```
VITE_APP_API_URL =  http://localhost:5000/api
```

4️⃣ Start FrontEnd Server
```
npm run dev
```
The app runs on http://localhost:5173

⚙️ Folder Structure

```
project/
├── backend/
│   ├── controllers/
│   │   └── commentController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── commentRoutes.js
│   ├── utils/
│   │   └── validate.js
│   ├── app.js
│   └── server.js
│
├── frotend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Comments/
│   │   │   └── Common/
│   │   ├── Contexts/
│   │   ├── pages/
│   │   ├── schemas/
│   │   ├── api/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```
🔑 API Endpoints (Summary)
| Method   | Endpoint                    | Description                     | Auth |
| -------- | --------------------------- | ------------------------------- | ---- |
| `POST`   | `/api/auth/register`        | Register new user               | ❌    |
| `POST`   | `/api/auth/login`           | Login user                      | ❌    |
| `GET`    | `/api/comments`             | Get comments (pagination, sort) | ✅    |
| `POST`   | `/api/comments/create`      | Add new comment                 | ✅    |
| `PUT`    | `/api/comments/update/:id`  | Edit comment                    | ✅    |
| `DELETE` | `/api/comments/delete/:id`  | Delete comment                  | ✅    |
| `POST`   | `/api/comments/like/:id`    | Like a comment                  | ✅    |
| `POST`   | `/api/comments/dislike/:id` | Dislike a comment               | ✅    |

💬 Example .env files
backend/.env
```
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/comments
JWT_SECRET=mysecret123
JWT_EXPIRES_IN = 7d
CLIENT_URL=http://localhost:5173
```
/frontend/.env
```
VITE_APP_API_URL =  http://localhost:5000/api
```
🎯 License

MIT License © 2025 — Built with ❤️ using MERN stack.

Clean component architecture
