const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("./routes/user");

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter);
mongoose
  .connect("mongodb://localhost:27017/usersDb")
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("error in connecting to DB");
  });


app.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
