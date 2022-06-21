const express = require("express");
const app=express();
const mongoose = require("mongoose");
userRoutes=require('./routes/userRoutes');

require("dotenv").config();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/us", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB Successfully... ");
});
db.on("error", (error) => {
  console.log(error);
});

app.use('/api',userRoutes);
module.exports = app;
