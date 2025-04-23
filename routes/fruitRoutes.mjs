import Fruit from "../models/fruit.mjs";
import express from "express";

const router = express.Router();

// INDUCES (Index, New, Delete, Update, Create, E, Seed)

// /api/fruits

// GET all fruits - Index
router.get("/", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (error) {
    console.log(error);
  }
});

// NEW - to be handled by the frontend

// DELETE one fruit by Id
router.delete("/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect(303, "/");
  } catch (error) {
    console.log(error);
  }
});

// UPDATE an existing fruit
router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.readyToEat) {
      req.body.readyToEat === "on"
        ? (req.body.readyToEat = true) //do some data correction
        : (req.body.readyToEat = false); //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);

    res.redirect(303, "/");
  } catch (error) {
    console.log(error);
  }
});

// CREATE a new fruit
router.post("/", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/api/fruits");
  } catch (error) {
    console.log(error);
  }
});

// Seed the database
// router.get("/seed", async (req, res) => {
//   try {
//     await Fruit.create([
//       {
//         name: "grapefruit",
//         color: "pink",
//         readyToEat: true,
//       },
//       {
//         name: "grape",
//         color: "purple",
//         readyToEat: false,
//       },
//       {
//         name: "avocado",
//         color: "green",
//         readyToEat: true,
//       },
//     ]);
//     res.redirect("/api/fruits");
//   } catch (error) {
//     console.error(error);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.json(fruit);
  } catch (error) {
    console.log(error);
  }
});

export default router;
