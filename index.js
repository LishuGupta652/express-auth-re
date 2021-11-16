const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// Importing the routes
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
// Connecting to mongoose database
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to the Database");
});

// Using middleware to parse the json files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using the routes
app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);
// Index route
app.get("/", (req, res) => {
  res.status(200).json({
    mesage: "Welcome to the world, Hey there the Georgeous friends!",
    routes: ["/api/user/register", "/api/user/login", "api/post"],
    schemaForRegister: {
      name: "name",
      email: "email",
      password: "password",
    },
  });
});

app.listen(PORT, () => {
  console.log(`app live on http://localhost:${PORT}`);
});
