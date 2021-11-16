const router = require("express").Router();
const User = require("../models/auth");
const { registerValidation, loginValidation } = require("../validation");
router.get("/register", (req, res) => {
  res.send("Router working");
});
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  // Validating the data
  const { error, data } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email already exists in the database
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send("Email Already exists");

  // Saving user to the database
  try {
    const newUser = await user.save();
    res.send(newUser._id);
  } catch (err) {
    return res.status(400).json({ err, message: err.message });
  }
});

module.exports = router;
