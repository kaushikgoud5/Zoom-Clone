const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const usersRouter = require("./routes/user");
const config = require("./config");

const PORT = config.port;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(usersRouter);
mongoose
  .connect(config.db_uri)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error in connecting to DB",err.message);
  });

  const users = {};
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on('joinRoom', (roomId, userId) => {
      console.log(`User ${userId} joined room: ${roomId}`);
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', userId);
  
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${userId}`);
        socket.to(roomId).emit('user-disconnected', userId);
      });
    });
  });

server.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
