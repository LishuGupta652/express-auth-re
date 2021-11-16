const router = require("express").Router();
const User = require("../models/auth");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");

// Routes
router.get("/register", (req, res) => {
  res.send("Router working");
});
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Validating the data
  const { error, data } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email already exists in the database
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send("Email Already exists");

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: hashedPassword });
  // Saving user to the database
  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    return res.status(400).json({ err, message: err.message });
  }
});

router.get("/login", (req, res) => {
  res
    .status(200)
    .json({ message: "Login route working! Try to send some data" });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate the data
  const { error, data } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExists = await User.findOne({ email });
  if (!userExists)
    return res
      .status(400)
      .send("Please try and signup... User does not exists.. ");

  // Check if the password is correct
  const validPassword = await bcrypt.compare(password, userExists.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  // TODO : create and assign a token
  res.send("login successful");
});

module.exports = router;
