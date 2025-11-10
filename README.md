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


Clean component architecture
