import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Fruit from "./models/fruit.mjs";

const app = express();
const port = process.env.PORT || 3000;

// mongoose connection
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

// mock data
const fruits = ["apple", "banana", "pear"];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fruit API");
});

app.get("/api/fruits", (req, res) => {
  res.send(fruits);
});

app.post("api/fruits", (res, req) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruit.create(req.body, (error, createdFruit) => {
    res.send(createdFruit);
  });
});

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
