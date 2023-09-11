const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./Model");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post(
  "/api",
  [body("name").isString().trim().notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;

      const existingPerson = await Person.findOne({ name });
      if (existingPerson) {
        return res
          .status(409)
          .json({ error: "Person with the same name already exists" });
      }

      const person = await Person.create({ name });
      res.status(201).json(person);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.get("/api/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put(
  "/api/:id",
  [
    // Add validation for the "name" field
    body("name").isString().trim().notEmpty(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;

      // Check if a person with the same name already exists, excluding the current person
      const existingPerson = await Person.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (existingPerson) {
        return res
          .status(409)
          .json({ error: "Person with the same name already exists" });
      }

      const person = await Person.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.json(person);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.delete("/api/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndRemove(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const port = process.env.PORT || 9888;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
