import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// mongoose connection
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

//middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fruit API");
});

// router
import fruitRoutes from "./routes/fruitRoutes.mjs";
app.use("/api/fruits", fruitRoutes);

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
