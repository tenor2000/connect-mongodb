import mongoose from "mongoose";

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean,
});

export default mongoose.model("Fruit", fruitSchema);
