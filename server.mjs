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

app.get("/api/fruits", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (error) {
    console.log(error);
  }
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

// Seed the database
app.get("/api/fruits/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/api/fruits");
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.json(fruit);
  } catch (error) {
    console.log(error);
  }
});

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
