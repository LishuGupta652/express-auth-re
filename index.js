const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// Connecting to mongoose database
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to the Database");
});
// Importing the routes
const authRoutes = require("./routes/authRoutes");

// Using middleware to parse the json files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using the routes
app.use("/api/user", authRoutes);
// Index route
app.get("/", (req, res) => {
  res.status(200).json({
    mesage: "Welcome to the world, Hey there the Georgeous friends!",
    routes: [],
  });
});

app.listen(PORT, () => {
  console.log(`app live on http://localhost:${PORT}`);
});
