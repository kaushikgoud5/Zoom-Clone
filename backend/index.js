const http = require("http");
const express =require("express");
const mongoose = require("mongoose");
const usersRouter = require('./routes/user');

const PORT=8000;

const app=express();
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/usersDb")
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("error in connecting to DB");
  });

  app.get('/', (req, res) => {
    res.send('Hello, Express and MongoDB!');
  });

  app.use(usersRouter);
  app.listen(PORT,()=>{
    console.log(`server is listening to ${PORT}`)
  })
