require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const commentRoutes = require('./routes/comments');

const app = express();
// const server = http.createServer(app);
// const { Server } = require('socket.io');

// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN || '*',
//     methods: ['GET','POST']
//   }
// });

// connect DB
//connectDB(process.env.MONGO_URI);

// middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// attach io to req for controllers to emit
//app.use((req,res,next)=>{ req.io = io; next(); });

// routes
//app.use('/api/auth', authRoutes);
//app.use('/api/comments', commentRoutes);

// io.on('connection', (socket) => {
//   console.log('socket connected', socket.id);
//   // subscribe to a room if needed or handle
//   socket.on('disconnect', () => console.log('socket disconnected', socket.id));
// });

//test route
// app.get("/", (req, res) => {
//   console.log("API is running...");
//   res.send("API is running...");
// });

const PORT = process.env.PORT || 5000;
app
  .listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use!`);
      console.log(`Try: lsof -ti:${PORT} | xargs kill -9`);
    } else {
      console.error("❌ Server error:", err);
    }
  });
